import { TNetworkName } from '../network-name'
import { TClaim } from './claim'
import { TokenType } from '../token-type'
import { TDefineTokenType } from './define-token-type'

interface IClaimLink {
  link: string,
  apiHost: string,
  tokenAddress: string,
  chainId: string,
  tokenId: string,
  tokenAmount: string,
  expirationTime: string,
  version: string,
  campaignId: string,
  wallet: string,
  manual: boolean,
  linkdropMasterAddress: string,
  linkKey: string,
  weiAmount: string,
  type: TokenType,
  linkdropSignerSignature: string,
  claim: TClaim,
  defineTokenType: TDefineTokenType
}

export default IClaimLink