import { TLinkdropSigner } from '../../types'

type TSignLinkERC1155Args = {
  linkdropSigner: TLinkdropSigner,
  weiAmount: string,
  tokenAddress: string,
  tokenId: string,
  tokenAmount: string,
  expirationTime: string,
  version: string,
  chainId: number,
  linkId: string,
  proxyAddress: string
}

export type TSignLinkERC1155 = ({
  linkdropSigner,
  weiAmount,
  tokenAddress,
  tokenId,
  expirationTime,
  tokenAmount,
  version,
  chainId,
  linkId,
  proxyAddress
}: TSignLinkERC1155Args) => Promise<string>