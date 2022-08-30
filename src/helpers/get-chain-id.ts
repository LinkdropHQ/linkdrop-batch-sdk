import { TNetworkName } from '../types'

export const getChainId = (network: TNetworkName) => {
  switch (network) {
    case 'mainnet':
      return 1
    case 'polygon':
      return 137
  }
}