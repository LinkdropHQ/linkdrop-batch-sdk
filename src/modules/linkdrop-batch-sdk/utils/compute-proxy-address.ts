import TComputeProxyAddress from '../../../types/modules/linkdrop-batch-sdk/compute-proxy-address'
import { ethers } from 'ethers'

export const buildCreate2Address = (creatorAddress: string, saltHex: string, byteCode: string) => {
  const byteCodeHash = ethers.utils.keccak256(byteCode)
  return `0x${ethers.utils
    .keccak256(
      `0x${['ff', creatorAddress, saltHex, byteCodeHash]
        .map(x => x.replace(/0x/, ''))
        .join('')}`
    )
    .slice(-40)}`.toLowerCase()
}

const computeProxyAddress: TComputeProxyAddress = async (
  factoryAddress,
  linkdropMasterAddress,
  campaignId
) => {
  try {
    if (factoryAddress == null || factoryAddress === '') {
      throw new Error('Please provide factory address')
    }
  
    if (linkdropMasterAddress == null || linkdropMasterAddress === '') {
      throw new Error('Please provide linkdrop master address')
    }
  
    if (campaignId == null || campaignId === '') {
      throw new Error('Please provide campaign id')
    }
  
    const salt = ethers.utils.solidityKeccak256(
      ['address', 'uint256'],
      [linkdropMasterAddress, campaignId]
    )
  
    const initcode = '0x6352c7420d6000526103ff60206004601c335afa6040516060f3'
  
    const proxyAddress = buildCreate2Address(factoryAddress, salt, initcode)
    return proxyAddress
  } catch (err) {
    console.error({
      err
    })
  }
}

export default computeProxyAddress