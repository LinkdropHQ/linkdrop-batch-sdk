import { ethers } from 'ethers'
import { TAsset, TTokenType, TCreateLinkResult } from '../types'
import { getBignumberInterval } from '../helpers'
import { crypto, createLinkERC1155, createLinkERC20, createLinkERC721 } from '../utils'
const expirationTime = '1900000000000'

const prepareAsset = async (
  asset: TAsset,
  signerKey: string,
  dashboardKey: string,
  tokenType: TTokenType,
  tokenAddress: string,
  proxyContractAddress: string,
  chainId: string | number,
  contractVersion: string,
  shortCodeLength: number = 12,
  shortCodeMixRegister: boolean = true
) => {
  let data = {}
  const linksAmount = getBignumberInterval('0', asset.links)
  for (let y = 0; y < Number(linksAmount.diff); y++) {
    try {
      if (tokenType === 'ERC1155') {
        data = await createLinkERC1155({
          linkdropSigner: new ethers.Wallet(signerKey),
          weiAmount: asset.weiAmount,
          tokenAddress,
          tokenId: asset.id,
          tokenAmount: asset.amount,
          expirationTime,
          version: contractVersion, // 
          chainId: Number(chainId),
          proxyAddress: proxyContractAddress,
          shortCodeLength,
          shortCodeMixRegister
        })
      } else if (tokenType === 'ERC721') {
        data = await createLinkERC721({
          linkdropSigner: new ethers.Wallet(signerKey),
          weiAmount: asset.weiAmount,
          tokenAddress,
          tokenId: asset.id,
          expirationTime,
          version: contractVersion, // 
          chainId: Number(chainId),
          proxyAddress: proxyContractAddress,
          shortCodeLength,
          shortCodeMixRegister
        })
      } else {
        data = await createLinkERC20({
          linkdropSigner: new ethers.Wallet(signerKey),
          weiAmount: asset.weiAmount,
          tokenAddress,
          tokenAmount: asset.amount,
          expirationTime,
          version: contractVersion, // 
          chainId: Number(chainId),
          proxyAddress: proxyContractAddress,
          shortCodeLength,
          shortCodeMixRegister
        })
      }
      let { linkdropSignerSignature, linkId, linkKey, shortCode } = data as TCreateLinkResult

      return {  
        encrypted_claim_code: crypto.encrypt(shortCode as string, dashboardKey),
        token_id: asset.id,
        token_amount: asset.amount,
        link_id: linkId,
        sender_signature: linkdropSignerSignature,
        expiration_time: expirationTime,
        wei_amount: asset.weiAmount
      }
    } catch (err) {
      console.log({ err })
    }
  }
}

export default prepareAsset