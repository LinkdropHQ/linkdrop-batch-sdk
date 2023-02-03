import { AxiosResponse } from 'axios'
import { TCampaignItem, TApiKey } from '../../types'

type TGetCampaignResponse = {
  success: boolean
  campaign: TCampaignItem
}

export type TGetCampaign = (
  apiHost: string,
  apiKey: TApiKey,
  campaignId: string,
) => Promise<
  AxiosResponse<
    TGetCampaignResponse
  >
>

export type TRequests = {
  getCampaign: TGetCampaign
}
