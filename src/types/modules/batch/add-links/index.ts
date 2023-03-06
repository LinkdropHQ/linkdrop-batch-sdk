import { TAsset } from '../../..' 

type TAddLinks = (
  assets: TAsset[],
  options?: {
    shortCodeLength: number,
    shortCodeMixRegister: boolean,
    expirationTime: string
  }
) => void

export default TAddLinks