import { ethers } from 'ethers'
import { TAsset, TTokenType, TCreateLinkResult, TLinkItem } from '../types'
import { getContractVersion } from '../helpers'
import { crypto, createLinkERC1155, createLinkERC20, createLinkERC721 } from '../utils'
const expirationTime = '1900000000000'

const prepareAssets = async (
  assets: TAsset[],
  signerKey: string,
  dashboardKey: string,
  tokenType: TTokenType,
  tokenAddress: string,
  proxyContractAddress: string,
  chainId: string | number
) => {
  const version = await getContractVersion(proxyContractAddress, Number(chainId))
  if (!version) {
    return alert('Cannot define version, unable to create links')
  }

  const result: TLinkItem[] = []

  for (let x = 0; x < assets.length; x++) {
    let data = {}
    const asset = assets[x]
    try {
      console.log({
        linkdropSigner: new ethers.Wallet(signerKey),
        weiAmount: asset.weiAmount,
        tokenAddress,
        tokenId: asset.id,
        tokenAmount: asset.amount,
        expirationTime,
        version, // 
        chainId: Number(chainId),
        proxyAddress: proxyContractAddress,
        dashboardKey
      })
      if (tokenType === 'ERC1155') {
        data = await createLinkERC1155({
          linkdropSigner: new ethers.Wallet(signerKey),
          weiAmount: asset.weiAmount,
          tokenAddress,
          tokenId: asset.id,
          tokenAmount: asset.amount,
          expirationTime,
          version, // 
          chainId: Number(chainId),
          proxyAddress: proxyContractAddress
        })
      } else if (tokenType === 'ERC721') {
        data = await createLinkERC721({
          linkdropSigner: new ethers.Wallet(signerKey),
          weiAmount: asset.weiAmount,
          tokenAddress,
          tokenId: asset.id,
          expirationTime,
          version, // 
          chainId: Number(chainId),
          proxyAddress: proxyContractAddress
        })
      } else {
        data = await createLinkERC20({
          linkdropSigner: new ethers.Wallet(signerKey),
          weiAmount: asset.weiAmount,
          tokenAddress,
          tokenAmount: asset.amount,
          expirationTime,
          version, // 
          chainId: Number(chainId),
          proxyAddress: proxyContractAddress
        })
      }
      let { linkdropSignerSignature, linkId, linkKey } = data as TCreateLinkResult

      result.push({  
        encrypted_link_key: crypto.encrypt(linkKey as string, dashboardKey),
        token_id: asset.id,
        token_amount: asset.amount,
        link_id: linkId,
        sender_signature: linkdropSignerSignature,
        expiration_time: expirationTime,
        wei_amount: asset.weiAmount
      })

    } catch (err) {
      console.log({ err })
    }
  }

  return result
}

export default prepareAssets