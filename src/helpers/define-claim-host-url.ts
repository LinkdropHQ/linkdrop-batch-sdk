import { claimHostUrl, testnetsClaimHostUrl } from '../configs'
import { TMode } from '../types'

type TDefineClaimHostUrl = (
  mode: TMode
) => string

const defineClaimHostUrl: TDefineClaimHostUrl = (
  chainId
) => {
  switch (chainId) {
    case 'testnets':
      return testnetsClaimHostUrl
    case 'mainnets':
    default:
      return claimHostUrl
  }
}

export default defineClaimHostUrl
