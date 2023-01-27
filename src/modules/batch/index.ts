import { IBatch, TApiKey, TBatchItem, TLinkItem } from '../../types'
import TAddLinks from '../../types/modules/batch/add-links'

class Batch implements IBatch {
  data: TBatchItem
  batchId: string
  claimLinks?: TLinkItem[]
  apiKey: TApiKey

  constructor (
    batchId: string,
    data: TBatchItem,
    claimLinks: TLinkItem[],
    apiKey: TApiKey
  ) {
    this.batchId = batchId
    this.data = data
    this.claimLinks = claimLinks
    this.apiKey = apiKey
  }

  addLinks: TAddLinks = (assets) => {
    
  }

}

export default Batch