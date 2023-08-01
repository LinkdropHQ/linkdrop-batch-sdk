const defineNetworkName = (chainId: number | null) : string => {
  switch (Number(chainId)) {
    case 1: return 'mainnet'
    case 5: return 'goerli'
    case 137: return 'matic'
    case 80001: return 'mumbai'
    case 8453: return 'basic'
    case 84531: return 'basicMumbai'
    default: return 'mainnet'
  }
}

export default defineNetworkName