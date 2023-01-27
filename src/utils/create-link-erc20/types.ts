import { TLinkdropSigner, TCreateLinkResult } from '../../types'

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

export type TCreateLinkERC20 = ({
  linkdropSigner,
  weiAmount,
  tokenAddress,
  tokenAmount,
  expirationTime,
  version,
  chainId,
  proxyAddress
}: TCreateLinkERC20Args) => Promise<TCreateLinkResult>