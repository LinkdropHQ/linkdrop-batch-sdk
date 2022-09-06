import { ILinkdropSDK, TNetworkName, TSDKOptions } from '../types'
import { TGenerateLink } from '../types/linkdrop-sdk/generate-link'
import { TGetProxyAddress } from '../types/linkdrop-sdk/get-proxy-address'
import { generateLink, computeProxyAddress } from '../utils'
import { getChainName } from '../helpers'
import { LinkdropFactory } from '../abi'
import contracts from '../configs'
import { ethers } from 'ethers'

class LinkdropSDK implements ILinkdropSDK {
  chain: TNetworkName;
  factoryAddress: string;
  apiHost: string;
  claimHost: string;
  chainId: number;
  options: TSDKOptions;
  jsonRPCUrl: string;
  initialized: boolean = false;
  provider: ethers.providers.JsonRpcProvider;
  versions: Record<string, string> = {};

  async initialization () {
    const provider = new ethers.providers.JsonRpcProvider(this.jsonRPCUrl)
    const { chainId }: { chainId: number} = await provider.getNetwork()

    this.chain = getChainName(chainId)
    const contract = contracts[String(chainId)]
    const {
      factoryAddress = contract.factory,
      apiHost = contract.apiHost,
      claimHost = contract.claimHost
    } = this.options

    this.factoryAddress = factoryAddress
    this.apiHost = apiHost
    this.claimHost = claimHost
    this.chainId = chainId
    this.provider = provider
    this.initialized = true
  }

  constructor (jsonRPCUrl: string, options: TSDKOptions = {}) {
    this.jsonRPCUrl = jsonRPCUrl
    this.options = options
  }

  async getVersion (masterAddress: string, campaignId: string) {
    const version = this.versions[campaignId]
    if (version) return version
    const factoryContract = await new ethers.Contract(this.factoryAddress, LinkdropFactory.abi, this.provider)
    this.versions[campaignId] = await factoryContract.getProxyMasterCopyVersion(masterAddress)
    return this.versions[campaignId]
  }

  getProxyAddress: TGetProxyAddress = ({
    campaignId,
    masterAddress // wallet of user where tokens are located
  }) => {
    return computeProxyAddress(
      this.factoryAddress,
      masterAddress,
      campaignId
    )
  }

  generateLink: TGenerateLink = async ({
    signer, // private key
    weiAmount,
    tokenAddress,
    tokenAmount,
    tokenId,
    expirationTime = '12345678910',
    campaignId,
    wallet,
    manual,
    type,
    masterAddress // wallet of user where tokens are located
  }) => {
    try {
      if (!this.initialized) { await this.initialization() }
      const result = await generateLink({
        factoryAddress: this.factoryAddress,
        chainId: this.chainId,
        claimHost: this.claimHost,
        masterAddress,
        signer,
        weiAmount,
        tokenAddress,
        tokenAmount,
        expirationTime,
        version: await this.getVersion(masterAddress, campaignId),
        campaignId,
        wallet,
        tokenId,
        manual,
        type
      })
      if (!result) { return }
      return result
    } catch (err) {
      console.log(err)
    }
  }
}

export default LinkdropSDK