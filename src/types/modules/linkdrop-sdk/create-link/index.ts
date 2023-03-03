import TLinkItem from "../../../link-item"
import TAsset from "../../../asset"
import { TTokenType } from '../../../token-type'

type TCreateLink = (
  link: TAsset,
  signerKey: string,
  encryptionKey: string,
  tokenStandard: TTokenType,
  tokenAddress: string,
  proxyContractAddress: string,
  chainId: number,
  proxyContractVersion: string,
  shortCodeLength?: number,
  shortCodeMixRegister?: boolean
) => Promise<TLinkItem | void>

export default TCreateLink
