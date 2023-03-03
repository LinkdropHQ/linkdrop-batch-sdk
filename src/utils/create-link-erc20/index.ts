import { TCreateLinkERC20 } from './types'
import { generateAccount, signLinkERC20 } from '../index'

export const createLinkERC20: TCreateLinkERC20 = async ({
  linkdropSigner,
  weiAmount,
  tokenAddress,
  tokenAmount,
  expirationTime,
  version,
  chainId,
  proxyAddress,
  shortCodeLength,
  shortCodeMixRegister
}) => {
  const { address: linkId, privateKey: linkKey, shortCode } = generateAccount(
    shortCodeLength,
    shortCodeMixRegister
  )
  const linkdropSignerSignature = await signLinkERC20({
    linkdropSigner,
    weiAmount,
    tokenAddress,
    tokenAmount,
    expirationTime,
    version,
    chainId,
    linkId,
    proxyAddress
  })

  return {
    linkKey,
    linkId,
    linkdropSignerSignature,
    shortCode
  }
}