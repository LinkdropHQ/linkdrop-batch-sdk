import { TLinkdropSigner } from '../../types'

type TSignLinkERC20Args = {
  linkdropSigner: TLinkdropSigner,
  weiAmount: string,
  tokenAddress: string,
  tokenAmount: string,
  expirationTime: string,
  version: string,
  chainId: number,
  linkId: string,
  proxyAddress: string
}

export type TSignLinkERC20 = ({
  linkdropSigner,
  weiAmount,
  tokenAddress,
  tokenAmount,
  expirationTime,
  version,
  chainId,
  linkId,
  proxyAddress
}: TSignLinkERC20Args) => Promise<string>