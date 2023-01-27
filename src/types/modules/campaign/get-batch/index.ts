import TBatch from "../../batch"

type TGetBatch = (
  batchId: string
) => Promise<TBatch | void>

export default TGetBatch
