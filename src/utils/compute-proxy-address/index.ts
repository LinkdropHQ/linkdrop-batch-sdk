import ethers from 'ethers'
import Wallet from 'ethereumjs-wallet'
// Turn off annoying warnings

import { TComputeProxyAddress, TBuildAddress } from './types'


export const buildCreate2Address: TBuildAddress = (
  creatorAddress, saltHex, byteCode
) => {
  const byteCodeHash = ethers.utils.keccak256(byteCode)
  return `0x${ethers.utils
    .keccak256(
      `0x${['ff', creatorAddress, saltHex, byteCodeHash]
        .map(x => x.replace(/0x/, ''))
        .join('')}`
    )
    .slice(-40)}`.toLowerCase()
}

export const computeBytecode = (
  // masterCopyAddress
) => {
  // const bytecode = `0x363d3d373d3d3d363d73${masterCopyAddress.slice(
  //   2
  // )}5af43d82803e903d91602b57fd5bf3`
  // return bytecode
}

export const computeProxyAddress: TComputeProxyAddress = (
  factoryAddress,
  linkdropMasterAddress,
  campaignId
) => {
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
}

