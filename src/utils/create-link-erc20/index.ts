import { TCreateLinkERC20 } from './types'
import { generateAccount, signLink } from '../index'

export const createLinkERC20: TCreateLinkERC20 = async ({
  linkdropSigner,
  weiAmount,
  tokenAddress,
  tokenAmount,
  expirationTime,
  version,
  chainId,
  proxyAddress
}) => {
  const { address: linkId, privateKey: linkKey } = generateAccount()

  const linkdropSignerSignature = await signLink({
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
    linkdropSignerSignature
  }
}