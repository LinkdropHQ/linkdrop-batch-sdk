import TAddLinks from './add-links'
import { TApiKey, TLinkItem, TBatchItem } from '../..'

interface IBatch {
  data: TBatchItem
  claimLinks?: TLinkItem[]
  batchId: string
  apiKey: TApiKey
  addLinks: TAddLinks
}

export default IBatch