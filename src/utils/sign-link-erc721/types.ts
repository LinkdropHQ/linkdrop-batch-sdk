import { TLinkdropSigner } from '../../types'

type TSignLinkERC721Args = {
  linkdropSigner: TLinkdropSigner,
  weiAmount: string,
  tokenAddress: string,
  tokenId: string,
  expirationTime: string,
  version: string,
  chainId: number,
  linkId: string,
  proxyAddress: string
}

export type TSignLinkERC721 = ({
  linkdropSigner,
  weiAmount,
  tokenAddress,
  tokenId,
  expirationTime,
  version,
  chainId,
  linkId,
  proxyAddress
}: TSignLinkERC721Args) => Promise<string>