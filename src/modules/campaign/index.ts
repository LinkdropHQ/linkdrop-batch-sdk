import {
  ICampaign,
  TCampaignItem,
  TAsset,
  TApiKey,
  TBatchItem,
  TLinkItem
} from '../../types'
import TGetBatches from '../../types/modules/campaign/get-batches'
import TGetBatch from '../../types/modules/campaign/get-batch'
import { batchesApi } from '../../api'
import Batch from '../batch'
import TCreateBatch from '../../types/modules/campaign/create-batch'
import { prepareAssets } from '../../helpers'

class Campaign implements ICampaign {
  data: TCampaignItem
  campaignId: string
  signerKey: string
  encryptionKey: string
  apiKey: TApiKey
  apiHost: string
  claimAppUrl: string

  constructor (
    campaignId: string,
    signerKey: string,
    encryptionKey: string,
    data: TCampaignItem,
    claimAppUrl: string,
    apiKey: TApiKey,
    apiHost: string
  ) {
    this.campaignId = campaignId
    this.signerKey = signerKey
    this.encryptionKey = encryptionKey
    this.data = data
    this.claimAppUrl = claimAppUrl
    this.apiKey = apiKey
    this.apiHost = apiHost
    
  }

  getBatches: TGetBatches = async () => {
    try {
      const campaignData = await batchesApi.getBatches(
        this.apiHost,
        this.apiKey,
        this.campaignId
      )
      const { data } = campaignData
      if (data) {
        const { batches, creator_address } = data
        return {
          batches,
          creator_address
        }
      }
    } catch (err) {
      console.error({
        err
      })
    }
  }

  getBatch: TGetBatch = async (
    batchId
  ) => {
    try {
      const campaignData = await batchesApi.getBatch(
        this.apiHost,
        this.apiKey,
        this.campaignId,
        batchId
      )
      const { data } = campaignData
      if (data) {
        const { batch, claim_links } = data
        return new Batch(
          batchId,
          batch,
          claim_links,
          this.encryptionKey,
          this.claimAppUrl,
          this.data,
          this.signerKey,
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

  createBatch: TCreateBatch = async (
    assets: TAsset[],
    options: {
      sponsored: boolean,
      batchDescription: string
    } = {
      sponsored: true,
      batchDescription: 'Created by SDK'
    }
  ) => {
    try {
      const transformedAssets = await prepareAssets(
        assets,
        this.signerKey,
        this.encryptionKey,
        this.data.token_standard,
        this.data.token_address,
        this.data.proxy_contract_address,
        this.data.chain_id
      )
      if (!transformedAssets) { return alert('Error with assets') }
      const response = await batchesApi.createBatch(
        this.apiHost,
        this.apiKey,
        this.data.campaign_id,
        transformedAssets,
        options.sponsored,
        options.batchDescription
      )
      if (response.data) {
        const {
          campaign_id,
          creator_address,
          claim_links,
          batch
        } = response.data
        return {
          batch,
          campaign_id,
          creator_address,
          claim_links
        } 
      }
    } catch (err) {
      console.error({
        err
      })
    }
  }

}

export default Campaign