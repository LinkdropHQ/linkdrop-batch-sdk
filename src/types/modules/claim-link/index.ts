import { TNetworkName } from '../../network-name'
import { TClaim } from './claim'
import { TTokenType } from '../../token-type'
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
  masterAddress: string,
  linkKey: string,
  weiAmount: string,
  type: TTokenType,
  linkdropSignerSignature: string,
  linkId: string,
  claim: TClaim,
  defineTokenType: TDefineTokenType
}

export default IClaimLink