import { ethers } from 'ethers'
import { TSignLinkERC721 } from './types'

export const signLinkERC721: TSignLinkERC721 = async ({
  linkdropSigner, // Wallet
  weiAmount,
  tokenAddress,
  tokenId,
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
      tokenId,
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