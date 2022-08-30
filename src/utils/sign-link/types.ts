import { TLinkdropSigner } from '../../types'

type TSignLinkArgs = {
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

export type TSignLink = ({
  linkdropSigner,
  weiAmount,
  tokenAddress,
  tokenAmount,
  expirationTime,
  version,
  chainId,
  linkId,
  proxyAddress
}: TSignLinkArgs) => Promise<string>