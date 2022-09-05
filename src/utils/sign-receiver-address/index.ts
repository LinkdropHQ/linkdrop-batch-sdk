import { ethers } from 'ethers'
import { TSignReceiverAddress } from './types'

export const signReceiverAddress: TSignReceiverAddress = async (linkKey, receiverAddress) => {
  const wallet = new ethers.Wallet(linkKey)
  const messageHash = ethers.utils.solidityKeccak256(
    ['address'],
    [receiverAddress]
  )
  const messageHashToSign = ethers.utils.arrayify(messageHash)
  const signature = await wallet.signMessage(messageHashToSign)
  return signature
}