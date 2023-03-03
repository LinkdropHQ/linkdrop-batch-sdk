import { TAsset } from '../../..' 

type TAddLinks = (
  assets: TAsset[],
  options?: {
    shortCodeLength: number,
    shortCodeMixRegister: boolean
  }
) => void

export default TAddLinks