import { AxiosResponse } from 'axios'
import { TCampaignItem } from '../../types'

type TGetCampaignResponse = {
  success: boolean
  campaign: TCampaignItem
}

export type TGetCampaign = (
  apiHost: string,
  apiKey: string,
  campaignSig: string,
  campaignId: string,
) => Promise<
  AxiosResponse<
    TGetCampaignResponse
  >
>

export type TRequests = {
  getCampaign: TGetCampaign
}
