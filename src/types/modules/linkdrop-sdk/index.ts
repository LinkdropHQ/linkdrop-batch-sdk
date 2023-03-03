import { TNetworkName } from '../../network-name'
import { TGetCampaign } from './get-campaign'
import { TGetLinkParams } from './get-link-params'
import { TGetLinkStatus } from './get-link-status'
import { TRedeem } from './redeem'
import TCreateLink from './create-link'
import TComputeProxyAddress from './compute-proxy-address'

interface ILinkdropSDK {
  chain: TNetworkName
  apiHost: string
  getCampaign: TGetCampaign
  getLinkParams: TGetLinkParams
  getLinkStatus: TGetLinkStatus
  redeem: TRedeem
  utils: {
    createLink: TCreateLink
    computeProxyAddress: TComputeProxyAddress
  }
}

export default ILinkdropSDK