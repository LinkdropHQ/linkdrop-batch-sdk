import {  ethers } from 'ethers'
import { LinkdropMastercopy } from '../abi'
import { defineJSONRpcUrl } from './'

type TGetContractVersion = (
  proxyContractAddress: string,
  chainId: number
) => Promise<string | null>

const getContractVersion: TGetContractVersion = async (
  proxyContractAddress,
  chainId
) => {
  const actualJsonRpcUrl = defineJSONRpcUrl({ chainId })
  if (!actualJsonRpcUrl) {
    return null
  }
  const provider = await new ethers.providers.JsonRpcProvider(actualJsonRpcUrl)
  const proxyContract = await new ethers.Contract(proxyContractAddress, LinkdropMastercopy.abi, provider)
  const version = await proxyContract.version()
  return String(version)

}
export default getContractVersion