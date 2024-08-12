const defineNetworkName = (chainId: number | null) : string => {
  switch (Number(chainId)) {
    case 1: return 'mainnet'
    case 137: return 'matic'
    case 8453: return 'base'
    case 13371: return 'immutableZkevm'
    default: return 'mainnet'
  }
}

export default defineNetworkName