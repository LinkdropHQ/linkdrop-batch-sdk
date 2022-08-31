import {  TCreateLinkERC1155 } from './types'
import { generateAccount, signLinkERC1155 } from '../index'

export const createLinkERC1155: TCreateLinkERC1155 = async ({
  linkdropSigner,
  weiAmount,
  tokenAddress,
  tokenId,
  tokenAmount,
  expirationTime,
  version,
  chainId,
  proxyAddress
}) => {
  const { address: linkId, privateKey: linkKey } = generateAccount()
  const linkdropSignerSignature = await signLinkERC1155({
    linkdropSigner,
    weiAmount,
    tokenAddress,
    tokenId,
    tokenAmount,
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