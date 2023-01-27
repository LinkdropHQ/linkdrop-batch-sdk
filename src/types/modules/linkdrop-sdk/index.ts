import { TNetworkName } from '../../network-name'
import { TRedeem } from './redeem'

import { TDeactivate } from './deactivate'
import { TReactivate } from './reactivate'
import { TGetLinkParams } from './get-link-params'
import { TGetLinkStatus } from './get-link-status'
import { TGetCampaign } from './get-campaign'
import TApiKey from '../../api-key'

interface ILinkdropSDK {
  apiKey: TApiKey
  chain: TNetworkName
  apiHost: string
  redeem: TRedeem,
  deactivate: TDeactivate,
  reactivate: TReactivate,
  getLinkParams: TGetLinkParams,
  getLinkStatus: TGetLinkStatus,
  getCampaign: TGetCampaign
}

export default ILinkdropSDK