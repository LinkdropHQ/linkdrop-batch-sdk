import { ILinkdropSDK, TNetworkName, TSDKOptions } from '../types'
import { TGenerateLink } from '../types/linkdrop-sdk/generate-link'
import { TGetProxyAddress } from '../types/linkdrop-sdk/get-proxy-address'
import { generateLink, computeProxyAddress } from '../utils'
import { getChainId } from '../helpers'
import contracts from '../configs'

class LinkdropSDK implements ILinkdropSDK {
  chain: TNetworkName;
  factoryAddress: string;
  apiHost: string;
  claimHost: string;
  chainId: number;

  constructor (chain: TNetworkName, options: TSDKOptions = {}) {
    this.chain = chain
    const chainId = getChainId(chain)
    const contract = contracts[chainId]
    const {
      factoryAddress = contract.factory,
      apiHost = contract.apiHost,
      claimHost = contract.claimHost
    } = options

    this.factoryAddress = factoryAddress
    this.apiHost = apiHost
    this.claimHost = claimHost
    this.chainId = chainId
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
        version: '1',
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