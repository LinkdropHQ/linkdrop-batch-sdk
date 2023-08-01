import { defineNetworkName } from './'
import {
  polygonJSONRPCUrl,
  mumbaiJSONRPCUrl,
  goerliJSONRPCUrl,
  mainnetJSONRPCUrl,
  basicGoerliJSONRPCUrl,
  basicJSONRPCUrl
} from '../configs'

const defineJSONRpcUrl = ({ chainId } : { chainId: number }) => {
  const networkName = defineNetworkName(chainId)
  switch (networkName) {
    case 'matic':
      return polygonJSONRPCUrl
    case 'mumbai':
      return mumbaiJSONRPCUrl
    case 'goerli':
      return goerliJSONRPCUrl
    case 'mainnet':
      return mainnetJSONRPCUrl
    case 'basic':
      return basicJSONRPCUrl
    case 'basicGoerli':
      return basicGoerliJSONRPCUrl
    default:
      return alert('Current chain id is not supported')
  }
}

export default defineJSONRpcUrl