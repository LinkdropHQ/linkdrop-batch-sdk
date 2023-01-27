import TAsset from "../../../asset"
import TBatchItem from "../../batch"

type TCreateBatch = (
  links: TAsset[],
  options?: { sponsored: boolean, batchDescription: string }
) => Promise<{
  campaign_id: string,
  creator_address: string,
  batch: TBatchItem,
  claim_links: TAsset[]
} | void>

export default TCreateBatch
