type TContracts = {
  [networkId: string | number]: {
    factory: string;
    claimHost: string;
    apiHost: string;
  }
}

const contracts: TContracts = {
  1: {
    factory: '0xadEA4080b6B3cA8CaB081ce839B3693DbBA8d480',
    claimHost: 'https://v1-2.claim.linkdrop.io',
    apiHost: 'https://mainnet-v1-1.linkdrop.io'
  }, // mainnet
  137: {
    factory: '0xadEA4080b6B3cA8CaB081ce839B3693DbBA8d480',
    claimHost: 'https://v1-2.claim.linkdrop.io',
    apiHost: 'https://matic-v1-1.linkdrop.io'
  }
}

export default contracts