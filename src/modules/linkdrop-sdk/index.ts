import { ILinkdropSDK, TNetworkName } from '../../types'
import { getLinkParams, getLinkStatus, redeemLink } from '../../helpers'
import Campaign from '../campaign'
import TApiKey from '../../types/api-key'
import { campaignsApi, linkApi } from '../../api'
import {
  testnetsApiUrl,
  apiUrl
} from '../../configs'
import { AxiosError } from 'axios'

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
    } catch (err: any | AxiosError) {
      console.error({
        err
      })
    }
  }

  async redeem (
    code, destination
  ) {
    try {
      const result = await redeemLink(
        code,
        destination,
        this.apiHost,
        this.apiKey
      )
      if (!result) {
        throw new Error('Link claim failed')
      }
      return {
        txHash: result.tx_hash,
        recipient: destination
      }
    } catch (err: any | AxiosError) {
      console.error(err)
    }
    
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
    } catch (err: any | AxiosError) {
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
    } catch (err: any | AxiosError) {
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
    try {
      const result = await getLinkStatus(
        linkId,
        this.apiHost,
        this.apiKey
      )
      if (!result) {
        throw new Error('Get link status failed')
      }
      return {
        txHash: result.tx_hash,
        recipient: result.recipient,
        status: result.status,
        claimedAtBlock: result.claimed_at_block,
        createdAt: result.created_at,
        linkId: result.link_id
      }
    } catch (err: any | AxiosError) {
      console.error({
        err
      })
    }
  }
}

export default LinkdropSDK