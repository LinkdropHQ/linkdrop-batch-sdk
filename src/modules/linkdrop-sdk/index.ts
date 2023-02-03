import { ILinkdropSDK, TNetworkName } from '../../types'
import { getLinkParams, getLinkStatus, redeemLink } from '../../helpers'
import Campaign from '../campaign'
import TApiKey from '../../types/api-key'
import { campaignsApi, linkApi } from '../../api'
import {
  testnetsApiUrl,
  apiUrl
} from '../../configs'

class LinkdropSDK implements ILinkdropSDK {
  apiKey: TApiKey
  chain: TNetworkName
  encryptionKey?: string
  apiHost: string
  claimApiUrl: string

  constructor ({
    apiKey,
    apiHost,
    claimApiUrl
  }: {
    apiKey: TApiKey,
    apiHost?: string,
    claimApiUrl?: string
  }) {
    this.apiKey = apiKey
    this.claimApiUrl = claimApiUrl || ''
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
        this.apiKey,
        campaignId
      )
      const { data } = campaignData
      if (data) {
        const { campaign } = data
        return new Campaign(
          campaignId,
          signerKey,
          encryptionKey,
          campaign,
          this.claimApiUrl,
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
    return await redeemLink(
      code,
      destination,
      this.apiHost,
      this.apiKey
    )
  }

  async reactivate (
    linkId
  ) {
    try {
      const linkData = await linkApi.reactivateLink(
        this.apiHost,
        this.apiKey,
        linkId
      )
      const { data } = linkData
      if (data) {
        const { success } = data
        return success
      }
    } catch (err) {
      console.error({
        err
      })
    }
    
  }

  async deactivate (
    linkId
  ) {
    try {
      const linkData = await linkApi.deactivateLink(
        this.apiHost,
        this.apiKey,
        linkId
      )
      const { data } = linkData
      if (data) {
        const { success } = data
        return success
      }
    } catch (err) {
      console.error({
        err
      })
    }
  }

  async getLinkParams (
    linkId
  ) {
    return await getLinkParams(
      this.apiHost,
      this.apiKey,
      linkId
    )
  }

  async getLinkStatus (
    linkId
  ) {
    return await getLinkStatus(
      linkId,
      this.apiHost,
      this.apiKey
    )
  }
}

export default LinkdropSDK