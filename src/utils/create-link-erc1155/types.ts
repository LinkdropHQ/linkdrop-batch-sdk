import { TLinkdropSigner } from '../../types'

type TCreateLinkERC1155Args = {
  linkdropSigner: TLinkdropSigner,
  weiAmount: string,
  tokenAddress: string,
  tokenId: string,
  tokenAmount: string,
  expirationTime: string,
  version: string,
  chainId: number,
  proxyAddress: string
}

type TCreateLinkResultERC1155 = {
  linkKey: string
  linkId: string
  linkdropSignerSignature: string
}

export type TCreateLinkERC1155 = ({
  linkdropSigner,
  weiAmount,
  tokenAddress,
  tokenId,
  tokenAmount,
  expirationTime,
  version,
  chainId,
  proxyAddress
}: TCreateLinkERC1155Args) => Promise<TCreateLinkResultERC1155>