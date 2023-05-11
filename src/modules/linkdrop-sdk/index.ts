import { ILinkdropSDK, TNetworkName } from '../../types'
import Campaign from '../campaign'
import { defineCampaignSig, getLinkParams, getLinkStatus, redeemLink } from '../../helpers'
import { campaignsApi } from '../../api'
import {
  testnetsApiUrl,
  apiUrl
} from '../../configs'
import { createLink, computeProxyAddress } from './utils'
import { generateAccount } from '../../utils'
import { TRedeem } from '../../types/modules/linkdrop-sdk/redeem'

class LinkdropSDK implements ILinkdropSDK {
  chain: TNetworkName
  apiHost: string
  claimHostUrl: string
  utils = {
    createLink,
    computeProxyAddress,
    generateAccount
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
  }

  redeem: TRedeem = async (
    claimCode, destination
  ) => {
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
  }
}

export default LinkdropSDK