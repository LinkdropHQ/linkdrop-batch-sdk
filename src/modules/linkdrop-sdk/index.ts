import { ILinkdropSDK, TNetworkName } from '../../types'
import { defineCampaignSig } from '../../helpers'
import Campaign from '../campaign'

import { campaignsApi, linkApi } from '../../api'
import {
  testnetsApiUrl,
  apiUrl
} from '../../configs'
import { AxiosError } from 'axios'

class LinkdropSDK implements ILinkdropSDK {
  chain: TNetworkName
  encryptionKey?: string
  apiHost: string
  claimApiUrl: string

  constructor ({
    apiHost,
    mode,
    claimApiUrl
  }: {
    apiHost?: string,
    mode?: 'testnets',
    claimApiUrl?: string
  } = {}) {
    this.claimApiUrl = claimApiUrl || ''
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
          this.claimApiUrl,
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
}

export default LinkdropSDK