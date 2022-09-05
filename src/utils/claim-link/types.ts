import { TokenType } from '../../types/token-type'

type TClaimLinkArgs = {
  apiHost: string
  weiAmount: string
  tokenAddress: string
  tokenAmount?: string
  tokenId?: string
  expirationTime: string
  version: string
  chainId: string
  linkKey: string
  masterAddress: string
  linkdropSignerSignature: string
  receiverAddress: string
  factoryAddress: string
  campaignId: string
  type: TokenType
}

type TClaimLinkResult = {
  errors: string[]
  success: boolean
  txHash: string
}

export type TClaimLink = ({
  apiHost,
  weiAmount,
  tokenAddress,
  tokenAmount,
  tokenId,
  expirationTime,
  version,
  chainId,
  linkKey,
  masterAddress,
  linkdropSignerSignature,
  receiverAddress,
  factoryAddress,
  campaignId,
  type
}: TClaimLinkArgs) => Promise<TClaimLinkResult>

export type TLinkData = {
  weiAmount: string
  expirationTime: string
  version: string
  chainId: string
  linkId: string
  linkdropMasterAddress: string
  linkdropSignerSignature: string
  receiverAddress: string
  receiverSignature: string
  factoryAddress: string
  campaignId: string,
  tokenAmount?: string,
  tokenId?: string,
  tokenAddress?: string,
  nftAddress?: string
}