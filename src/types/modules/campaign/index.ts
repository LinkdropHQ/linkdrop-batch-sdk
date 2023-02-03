import { TTokenType, TCampaignItem, TApiKey } from '../..'
import TGetBatches from './get-batches'
import TGetBatch from './get-batch'
import TCreateBatch from './create-batch'

type ICampaign = {
  data: TCampaignItem
  campaignId: string
  signerKey: string
  encryptionKey: string
  claimAppUrl: string,
  apiKey: TApiKey
  apiHost: string
  getBatches: TGetBatches,
  getBatch: TGetBatch,
  createBatch: TCreateBatch
}

export default ICampaign