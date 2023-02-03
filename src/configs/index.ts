type TContracts = Record<string | number, {
    factory: string;
    claimHost: string;
    apiHost: string;
}>

const contracts: TContracts = {
  1: {
    factory: '0x926923238FE6f4866E7FB29a05538e7C4C118a53',
    claimHost: 'https://v1-2.claim.linkdrop.io',
    apiHost: 'https://mainnet-v1-1.linkdrop.io'
  }, // mainnet
  137: {
    factory: '0x632E4Ef82188d466462Aecdc0193059C4Cd294Ec',
    claimHost: 'https://v1-2.claim.linkdrop.io',
    apiHost: 'https://matic-v1-1.linkdrop.io'
  } // pol
}

export const apiUrl = 'https://dev.dashboard-api.linkdrop.io/api/v1'
export const testnetsApiUrl = 'https://dev.dashboard-api.linkdrop.io/api/v1'

export const polygonJSONRPCUrl = 'https://rpc-mainnet.maticvigil.com/v1/ad4cd2ea018ddb1ccd0418ffa43c27b3d99fbd55'
export const mainnetJSONRPCUrl = 'https://mainnet.infura.io/v3/620c738fbe1843a18f47ada0e60e738a'
export const goerliJSONRPCUrl = 'https://goeli.infura.io/v3/620c738fbe1843a18f47ada0e60e738a'
export const mumbaiJSONRPCUrl = 'https://rpc-mumbai.maticvigil.com/v1/f592ae2e5afb3bebe39314e9bd0949de5b74cd2f'

export default contracts