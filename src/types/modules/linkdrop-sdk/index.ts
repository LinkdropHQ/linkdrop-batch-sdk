import { TNetworkName } from '../../network-name'
import { TGetCampaign } from './get-campaign'

interface ILinkdropSDK {
  chain: TNetworkName
  apiHost: string
  getCampaign: TGetCampaign
}

export default ILinkdropSDK