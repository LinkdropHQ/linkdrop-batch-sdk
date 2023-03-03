import { TLinkdropSigner, TCreateLinkResult } from '../../types'

type TCreateLinkERC20Args = {
  linkdropSigner: TLinkdropSigner,
  weiAmount: string
  tokenAddress: string
  tokenAmount: string
  expirationTime: string
  version: string
  chainId: number
  proxyAddress: string
  shortCodeLength: number
  shortCodeMixRegister: boolean
}

export type TCreateLinkERC20 = ({
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
}: TCreateLinkERC20Args) => Promise<TCreateLinkResult>