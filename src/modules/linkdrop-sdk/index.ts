import { ILinkdropSDK, TNetworkName } from '../../types'
import { getLinkParams } from '../../helpers'

class LinkdropSDK implements ILinkdropSDK {
  apiKey: string
  chain: TNetworkName
  encryptionKey?: string
  apiHost: string

  async initialization () {
    // const provider = new ethers.providers.JsonRpcProvider(this.jsonRPCUrl)
    // const { chainId }: { chainId: number} = await provider.getNetwork()

    // this.chain = getChainName(chainId)
    // const contract = contracts[String(chainId)]
    // const {
    //   factoryAddress = contract.factory,
    //   apiHost = contract.apiHost,
    //   claimHost = contract.claimHost
    // } = this.options
  }

  constructor ({
    apiKey,
    chain,
    encryptionKey,
    apiHost
  }) {
    this.apiKey = apiKey
    this.chain = chain
    this.encryptionKey = encryptionKey
    this.apiHost = apiHost
  }

  async redeem (
    code, destination
  ) {
    return {
      txHash: '', recipient: ''
    }
  }

  async reactivate (
    linkId
  ) {
    return true
  }

  async deactivate (
    linkId
  ) {
    return true
  }

  async getLinkParams (
    linkId
  ) {
    return await getLinkParams(linkId)
  }

  async getVersion (
    // masterAddress: string, campaignId: string
  ) {
    // const version = this.versions[campaignId]
    // if (version) return version
    // const factoryContract = await new ethers.Contract(this.factoryAddress, LinkdropFactory.abi, this.provider)
    // this.versions[campaignId] = await factoryContract.getProxyMasterCopyVersion(masterAddress, campaignId)
    // return this.versions[campaignId]
  }

  getProxyAddress = (
    // {
    //   campaignId,
    //   masterAddress // wallet of user where tokens are located
    // }
  ) => {
    // return computeProxyAddress(
    //   this.factoryAddress,
    //   masterAddress,
    //   campaignId
    // )
  }


}

export default LinkdropSDK