import { TAsset, TTokenType, TLinkItem } from '../types'
import prepareAsset from './prepare-asset'

const prepareAssets = async (
  assets: TAsset[],
  signerKey: string,
  dashboardKey: string,
  tokenType: TTokenType,
  tokenAddress: string,
  proxyContractAddress: string,
  chainId: string | number,
  contractVersion: string,
  expirationTime: string = '1900000000000',
  shortCodeLength: number = 12,
  shortCodeMixRegister: boolean = true
) => {
  const result: TLinkItem[] = []
  for (let x = 0; x < assets.length; x++) {
    const asset = assets[x]
    const linkItem = await prepareAsset(
      asset,
      signerKey,
      dashboardKey,
      tokenType,
      tokenAddress,
      proxyContractAddress,
      chainId,
      contractVersion,
      expirationTime,
      shortCodeLength,
      shortCodeMixRegister
    )

    if (!linkItem) { continue }
    result.push(
      linkItem
    )
  }
  return result
}

export default prepareAssets