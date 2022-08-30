import { TNetworkName } from '../network-name'
import { TGenerateLink } from './generate-link'

interface ILinkdropSDK {
  chain: TNetworkName,
  factoryAddress: string,
  apiHost: string,
  claimHost: string,
  generateLink: TGenerateLink,
  chainId: number
}

export default ILinkdropSDK