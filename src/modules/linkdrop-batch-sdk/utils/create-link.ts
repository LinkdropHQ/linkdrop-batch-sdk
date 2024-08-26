import TCreateLink from '../../../types/modules/linkdrop-batch-sdk/create-link'
import { prepareAsset } from '../../../helpers'

const createLink: TCreateLink = async (
  asset,
  signerKey,
  encryptionKey,
  tokenStandard,
  tokenAddress,
  proxyContractAddress,
  chainId,
  proxyContractVersion,
  expirationTime = '1900000000000',
  shortCodeLength = 12,
  shortCodeMixRegister = true
) => {
  try {
    if (!encryptionKey) {
      throw new Error('No encryption key provided')
    }
    if (!signerKey) {
      throw new Error('No signer key provided')
    }

    const transformedAsset = await prepareAsset(
      asset,
      signerKey,
      encryptionKey,
      tokenStandard,
      tokenAddress,
      proxyContractAddress,
      chainId,
      proxyContractVersion,
      expirationTime,
      shortCodeLength,
      shortCodeMixRegister
    )

    return transformedAsset
  } catch (err) {
    console.error({
      err
    })
  }
}

export default createLink