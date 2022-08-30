import { TLinkdropSigner } from '../../types'

type TCreateLinkERC20Args = {
  linkdropSigner: TLinkdropSigner,
  weiAmount: string,
  tokenAddress: string,
  tokenAmount: string,
  expirationTime: string,
  version: string,
  chainId: number,
  proxyAddress: string
}

type TCreateLinkResultERC20 = {
  linkKey: string
  linkId: string
  linkdropSignerSignature: string
}

export type TCreateLinkERC20 = ({
  linkdropSigner,
  weiAmount,
  tokenAddress,
  tokenAmount,
  expirationTime,
  version,
  chainId,
  proxyAddress
}: TCreateLinkERC20Args) => Promise<TCreateLinkResultERC20>