import {
  ICampaign,
  TCampaignItem,
  TAsset,
  TApiKey
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

  constructor (
    campaign_id: string,
    signer_key: string,
    encryption_key: string,
    data: TCampaignItem,
    apiKey: TApiKey,
    apiHost: string
  ) {
    this.campaignId = campaign_id
    this.signerKey = signer_key
    this.encryptionKey = encryption_key
    this.data = data
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
        
        batchId,
        
      )
      const { data } = campaignData
      if (data) {
        const { batch, claim_links } = data
        return new Batch(
          batchId,
          batch,
          claim_links,
          this.apiKey
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
      sponsored: false,
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
      batchesApi.createBatch(
        this.apiHost,
        this.apiKey,
        this.data.campaign_id,
        transformedAssets,
        options.sponsored,
        options.batchDescription
      )
    } catch (err) {
      console.error({
        err
      })
    }
  }

}

export default Campaign