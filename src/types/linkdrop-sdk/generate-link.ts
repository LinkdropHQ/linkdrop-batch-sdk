import { TokenType } from '../token-type'

export type TGenerateLinkArgs = {
  signer: string,
  weiAmount: string,
  tokenAddress: string,
  tokenAmount?: string,
  tokenId?: string,
  expirationTime: string,
  campaignId: string,
  wallet: string,
  manual: boolean,
  type: TokenType,
  masterAddress: string
}

export type TGenerateLink = ({
  signer,
  weiAmount,
  tokenAddress,
  tokenAmount,
  tokenId,
  expirationTime,
  campaignId,
  wallet,
  manual,
  type,
  masterAddress
} : TGenerateLinkArgs) => Promise<{
  url: string,
  linkId: string,
  linkKey: string,
  linkdropSignerSignature: string
} | void>