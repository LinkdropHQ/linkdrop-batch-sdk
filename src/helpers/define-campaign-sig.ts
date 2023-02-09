import { ethers } from "ethers"

type TDefineCampaignSig = (
  campaignId: string,
  signerKey: string
) => Promise<string>

const defineCampaignSig: TDefineCampaignSig = async (
  campaignId,
  signerKey
) => {
  const timestamp = Math.round(+new Date())
  const template = `API-AUTH-${campaignId}-${timestamp}`
  const signer = new ethers.Wallet(signerKey)
  const messageHash = ethers.utils.id(template)
  const signature = await signer.signMessage(messageHash)
  const messageBase64 = ethers.utils.base64.encode(signature)
  const result = `${timestamp}-${campaignId}-${messageBase64}`
  return result
}

export default defineCampaignSig
