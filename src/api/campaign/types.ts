import { AxiosResponse } from 'axios'
import { TCampaignItem, TApiKey } from '../../types'

type TGetCampaignResponse = {
  success: boolean
  campaign: TCampaignItem
}

export type TGetCampaign = (
  apiHost: string,
  campaignId: string,
  apiKey: TApiKey
) => Promise<
  AxiosResponse<
    TGetCampaignResponse
  >
>

export type TRequests = {
  getCampaign: TGetCampaign
}
