import TAddLinks from './add-links'
import TGetLinks from './get-links'

import { TLinkItem, TBatchItem } from '../..'

interface IBatch {
  data: TBatchItem
  claimLinks?: TLinkItem[]
  batchId: string
  encryptionKey: string
  claimHostUrl: string
  campaignSig: string
  apiHost: string
  addLinks: TAddLinks
  getLinks: TGetLinks
}

export default IBatch