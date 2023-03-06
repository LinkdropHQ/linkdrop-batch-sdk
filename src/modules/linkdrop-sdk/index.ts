import { ILinkdropSDK, TAsset, TNetworkName, TTokenType } from '../../types'
import Campaign from '../campaign'
import { defineCampaignSig, getLinkParams, getLinkStatus, redeemLink } from '../../helpers'
import { campaignsApi, linkApi } from '../../api'
import {
  testnetsApiUrl,
  apiUrl
} from '../../configs'
import { AxiosError } from 'axios'
import { createLink, computeProxyAddress } from './utils'
import { TRedeem } from '../../types/modules/linkdrop-sdk/redeem'

class LinkdropSDK implements ILinkdropSDK {
  chain: TNetworkName
  apiHost: string
  claimHostUrl: string
  utils = {
    createLink,
    computeProxyAddress
  }

  constructor ({
    apiHost,
    mode,
    claimHostUrl
  }: {
    apiHost?: string,
    mode?: 'testnets',
    claimHostUrl?: string
  } = {}) {
    this.claimHostUrl = claimHostUrl || ''
    if (apiHost) {
      this.apiHost = apiHost
    } else {
      this.apiHost = mode === 'testnets' ? testnetsApiUrl : apiUrl
    }
  }

  createCampaignSig = async (
    campaignId: string,
    signerKey: string
  ) => {
    return await defineCampaignSig(
      campaignId,
      signerKey
    )
  }

  async getCampaign (
    campaignId: string,
    signerKey: string,
    encryptionKey: string
  ) {
    try {
      const campaignSig = await this.createCampaignSig(
        campaignId,
        signerKey
      )
      const campaignData = await campaignsApi.getCampaign(
        this.apiHost,
        campaignSig,
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
          this.claimHostUrl,
          campaignSig,
          this.apiHost
        )
      }
    } catch (err: any | AxiosError) {
      console.error({
        err
      })
    }
  }

  redeem: TRedeem = async (
    claimCode, destination
  ) => {
    try {
      const result = await redeemLink(
        claimCode,
        destination,
        this.apiHost
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

  async getLinkParams (
    claimCode
  ) {
    return await getLinkParams(
      this.apiHost,
      claimCode
      
    )
  }

  async getLinkStatus (
    claimCode
  ) {
    try {
      const result = await getLinkStatus(
        this.apiHost,
        claimCode
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