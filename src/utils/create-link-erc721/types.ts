import { TLinkdropSigner, TCreateLinkResult } from '../../types'

type TCreateLinkERC721Args = {
  linkdropSigner: TLinkdropSigner,
  weiAmount: string,
  tokenAddress: string,
  tokenId: string,
  expirationTime: string,
  version: string,
  chainId: number,
  proxyAddress: string
  shortCodeLength: number
  shortCodeMixRegister: boolean
}

export type TCreateLinkERC721 = ({
  linkdropSigner,
  weiAmount,
  tokenAddress,
  tokenId,
  expirationTime,
  version,
  chainId,
  proxyAddress
}: TCreateLinkERC721Args) => Promise<TCreateLinkResult>