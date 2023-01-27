import { TLinkdropSigner, TCreateLinkResult } from '../../types'

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
}: TCreateLinkERC1155Args) => Promise<TCreateLinkResult>