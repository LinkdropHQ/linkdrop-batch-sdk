import { TBatchItem } from "../../.."
type TGetBatches = () => Promise<{
  batches: TBatchItem[],
  creator_address: string
} | void>

export default TGetBatches
