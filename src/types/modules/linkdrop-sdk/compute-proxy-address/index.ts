type TComputeProxyAddress = (
  factoryAddress: string,
  marsterAddress: string,
  campaingId: string
) => Promise<string | void>

export default TComputeProxyAddress