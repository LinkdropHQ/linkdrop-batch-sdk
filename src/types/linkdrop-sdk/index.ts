import { TNetworkName } from '../network-name'
import { TRedeem } from './redeem'

import { TDeactivate } from './deactivate'
import { TReactivate } from './reactivate'
import { TGetLinkParams } from './get-link-params'

interface ILinkdropSDK {
  apiKey: string
  chain: TNetworkName
  encryptionKey?: string
  apiHost: string
  redeem: TRedeem,
  deactivate: TDeactivate,
  reactivate: TReactivate,
  getLinkParams: TGetLinkParams

}

export default ILinkdropSDK