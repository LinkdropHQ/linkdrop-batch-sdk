import TLinkItem from "../../../link-item"
import TBatchItem from "../../../batch-item"
import TAsset from "../../../asset"

type TCreateBatch = (
  links: TAsset[],
  options?: {
    batchDescription: string,
    shortCodeLength: number,
    shortCodeMixRegister: boolean
  }
) => Promise<{
  campaign_id: string,
  creator_address: string,
  batch: TBatchItem,
  claim_links: TLinkItem[]
} | void>

export default TCreateBatch
