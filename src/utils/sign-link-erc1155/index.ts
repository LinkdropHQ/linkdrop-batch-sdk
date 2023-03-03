import { ethers } from 'ethers'
import { TSignLinkERC1155 } from './types'

export const signLinkERC1155: TSignLinkERC1155 = async ({
  linkdropSigner, // Wallet
  weiAmount,
  tokenAddress,
  tokenId,
  tokenAmount,
  expirationTime,
  version,
  chainId,
  linkId,
  proxyAddress
}) => { 
  const messageHash = ethers.utils.solidityKeccak256(
    ['uint', 'address', 'uint', 'uint', 'uint', 'uint', 'uint', 'address', 'address'],
    [
      weiAmount,
      tokenAddress,
      tokenId,
      Number(tokenAmount),
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