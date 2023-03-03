import { IBatch, TBatchItem, TLinkItem, TCampaignItem } from '../../types'
import TAddLinks from '../../types/modules/batch/add-links'
import TGetLinks from '../../types/modules/batch/get-links'
import { crypto } from '../../utils'
import { prepareAssets } from '../../helpers'
import { batchesApi } from '../../api'

class Batch implements IBatch {
  data: TBatchItem
  batchId: string
  claimLinks?: TLinkItem[]
  campaignSig: string
  encryptionKey: string
  apiHost: string
  claimAppUrl: string
  campaignData: TCampaignItem
  signerKey: string

  constructor (
    batchId: string,
    data: TBatchItem,
    claimLinks: TLinkItem[],
    encryptionKey: string,
    claimAppUrl: string,
    campaignData: TCampaignItem,
    signerKey: string,
    campaignSig: string,
    apiHost: string
  ) {
    this.batchId = batchId
    this.data = data
    this.claimLinks = claimLinks
    this.campaignSig = campaignSig
    this.encryptionKey = encryptionKey
    this.apiHost = apiHost
    this.claimAppUrl = claimAppUrl
    this.campaignData = campaignData
    this.signerKey = signerKey
  }

  addLinks: TAddLinks = async (
    assets,
    {
      shortCodeLength,
      shortCodeMixRegister
    } = {
      shortCodeLength: 12,
      shortCodeMixRegister: true
    }
  ) => {
    try {
      const transformedAssets = await prepareAssets(
        assets,
        this.signerKey,
        this.encryptionKey,
        this.campaignData.token_standard,
        this.campaignData.token_address,
        this.campaignData.proxy_contract_address,
        this.campaignData.chain_id,
        this.campaignData.proxy_contract_version,
        shortCodeLength,
        shortCodeMixRegister
      )
      if (!transformedAssets) { return alert('Error with assets') }
      return await batchesApi.addLinks(
        this.apiHost,
        this.campaignSig,
        this.campaignData.campaign_id,
        this.batchId,
        transformedAssets
      )
    } catch (err) {
      console.error({
        err
      })
    }
  }

  getLinks: TGetLinks = () => {
    if (!this.claimLinks) {
      return []
    }
    return this.claimLinks.map(link => {
      const encryptedClaimCode = link.encrypted_claim_code
      const claimCode = crypto.decrypt(encryptedClaimCode, this.encryptionKey)
      return {
        linkId: link.link_id,
        claimCode,
        claimLink: `${this.claimAppUrl}/#/claim/${claimCode}`
      }
    })
  }
}

export default Batch