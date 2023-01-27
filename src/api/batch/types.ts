import { AxiosResponse } from 'axios'
import { TBatchItem, TLinkItem, TApiKey } from '../../types'

type TGetBatchesResponse = {
  success: boolean
  creator_address: string
  batches: TBatchItem[]
}

type TGetBatchResponse = {
  success: boolean
  creator_address: string
  batch: TBatchItem
  claim_links: TLinkItem[]
}

type TCreateBatchResponse = {
  success: boolean
  campaign_id: string,
  creator_address: string,
  batch: TBatchItem,
  claimLinks: TLinkItem[]
}

export type TGetBatches = (
  apiHost: string,
  apiKey: TApiKey,
  campaignId: string
) => Promise<
  AxiosResponse<
    TGetBatchesResponse
  >
>

export type TGetBatch = (
  apiHost: string,
  apiKey: TApiKey,
  campaignId: string,
  batchId: string
) => Promise<
  AxiosResponse<
    TGetBatchResponse
  >
>

export type TCreateBatch = (
  apiHost: string,
  apiKey: TApiKey,
  campaignId: string,
  claimLinks: TLinkItem[],
  sponsored: boolean,
  batchDescription: string
) => Promise<
  AxiosResponse<
    TCreateBatchResponse
  >
>

export type TRequests = {
  getBatches: TGetBatches,
  getBatch: TGetBatch,
  createBatch: TCreateBatch
}
