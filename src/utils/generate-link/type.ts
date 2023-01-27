import { TGenerateLinkArgs } from '../../types/modules/linkdrop-sdk/generate-link'

export type TGenerateLinkUtil = ({
  factoryAddress,
  chainId,
  claimHost,
  signer,
  weiAmount,
  tokenAddress,
  tokenAmount,
  expirationTime,
  version,
  campaignId,
  wallet,
  masterAddress,
  tokenId
}: TGenerateLinkArgs & {
  factoryAddress: string,
  chainId: number,
  claimHost: string,
  version: string,
  manual: boolean
}) => Promise<void | { url: string, linkId: string, linkKey: string, linkdropSignerSignature: string }>