import { ILinkdropSDK, TNetworkName } from '../../types'
import { getLinkParams, getLinkStatus } from '../../helpers'
import Campaign from '../campaign'
import TApiKey from '../../types/api-key'
import { campaignsApi } from '../../api'
import {
  testnetsApiUrl,
  apiUrl
} from '../../configs'

class LinkdropSDK implements ILinkdropSDK {
  apiKey: TApiKey
  chain: TNetworkName
  encryptionKey?: string
  apiHost: string

  constructor ({
    apiKey,
    apiHost
  }: {
    apiKey: TApiKey,
    apiHost?: string
  }) {
    this.apiKey = apiKey
    if (apiHost) {
      this.apiHost = apiHost
    } else {
      this.apiHost = apiKey.key.includes('TEST') ? testnetsApiUrl : apiUrl
    }
  }

  async getCampaign (
    campaignId: string,
    signerKey: string,
    encryptionKey: string
  ) {
    try {
      const campaignData = await campaignsApi.getCampaign(
        this.apiHost,
        campaignId,
        this.apiKey
      )
      const { data } = campaignData
      if (data) {
        const { campaign } = data
        return new Campaign(
          campaignId,
          signerKey,
          encryptionKey,
          campaign,
          this.apiKey,
          this.apiHost
        )
      }
    } catch (err) {
      console.error({
        err
      })
    }
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
    const linkParams = await getLinkParams(linkId)
    return linkParams
  }

  async getLinkStatus (
    linkId
  ) {
    return await getLinkStatus(linkId)
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