import { claimHostUrl, testnetsClaimHostUrl } from '../configs'

type TDefineClaimHostUrl = (
  chainId: number
) => string

const defineClaimHostUrl: TDefineClaimHostUrl = (
  chainId
) => {
  switch (chainId) {
    case 80001:
    case 84531:
    case 5:
      return testnetsClaimHostUrl
    case 137:
    case 1:
    case 8453:
    default:
      return claimHostUrl
  }
}

export default defineClaimHostUrl
