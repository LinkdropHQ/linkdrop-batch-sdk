import {  TCreateLinkERC721 } from './types'
import { generateAccount, signLinkERC721 } from '../index'

export const createLinkERC721: TCreateLinkERC721 = async ({
  linkdropSigner, // Wallet
  weiAmount,
  tokenAddress,
  tokenId,
  expirationTime,
  version,
  chainId,
  proxyAddress
}) => {
  const { address: linkId, privateKey: linkKey } = generateAccount()

  const linkdropSignerSignature = await signLinkERC721({
    linkdropSigner,
    weiAmount,
    tokenAddress,
    tokenId,
    expirationTime,
    version,
    chainId,
    linkId,
    proxyAddress
  })
  return {
    linkKey, // link's ephemeral private key
    linkId, // address corresponding to link key
    linkdropSignerSignature // signed by linkdrop verifier
  }
}