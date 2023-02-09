import { TCampaignItem } from '../..'
import TGetBatches from './get-batches'
import TGetBatch from './get-batch'
import TCreateBatch from './create-batch'
import { TRedeem } from './redeem'

import { TDeactivate } from './deactivate'
import { TReactivate } from './reactivate'
import { TGetLinkParams } from './get-link-params'
import { TGetLinkStatus } from './get-link-status'

type ICampaign = {
  data: TCampaignItem
  campaignId: string
  signerKey: string
  encryptionKey: string
  claimAppUrl: string,
  apiHost: string
  campaignSig: string
  getBatches: TGetBatches,
  getBatch: TGetBatch,
  createBatch: TCreateBatch,
  redeem: TRedeem
  deactivate: TDeactivate
  reactivate: TReactivate
  getLinkParams: TGetLinkParams
  getLinkStatus: TGetLinkStatus
}

export default ICampaign