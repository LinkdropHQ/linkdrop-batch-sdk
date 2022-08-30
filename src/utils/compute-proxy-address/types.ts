export type TComputeProxyAddress = (
  factoryAddress: string,
  linkdropMasterAddress: string,
  campaignId: string
) => string

export type TBuildAddress = (
  creatorAddress: string,
  saltHex: string,
  byteCode: string
) => string