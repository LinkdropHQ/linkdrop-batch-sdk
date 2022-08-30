import { ethers } from 'ethers'
import { TSignLink } from './types'

export const signLink: TSignLink = async ({
  linkdropSigner, // Wallet
  weiAmount,
  tokenAddress,
  tokenAmount,
  expirationTime,
  version,
  chainId,
  linkId,
  proxyAddress
}) => {
  const messageHash = ethers.utils.solidityKeccak256(
    ['uint', 'address', 'uint', 'uint', 'uint', 'uint', 'address', 'address'],
    [
      weiAmount,
      tokenAddress,
      tokenAmount,
      expirationTime,
      version,
      chainId,
      linkId,
      proxyAddress
    ]
  )
  const messageHashToSign = ethers.utils.arrayify(messageHash)
  const signature = await linkdropSigner.signMessage(messageHashToSign)
  return signature
}