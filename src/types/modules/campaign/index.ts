import { TCampaignItem } from '../..'
import TGetBatches from './get-batches'
import TGetBatch from './get-batch'
import TCreateBatch from './create-batch'

import { TDeactivate } from './deactivate'
import { TReactivate } from './reactivate'


type ICampaign = {
  data: TCampaignItem
  campaignId: string
  signerKey: string
  encryptionKey: string
  claimHostUrl: string
  apiHost: string
  campaignSig: string
  getBatches: TGetBatches
  getBatch: TGetBatch
  createBatch: TCreateBatch
  deactivate: TDeactivate
  reactivate: TReactivate
}

export default ICampaign