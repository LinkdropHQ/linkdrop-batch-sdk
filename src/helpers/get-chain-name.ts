import { TNetworkName } from '../types'

export const getChainName = (chainId: number | string) => {
  switch (chainId) {
    case 137:
      return 'polygon'
    default:
      return 'mainnet'
  }
}