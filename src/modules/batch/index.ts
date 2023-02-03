import { IBatch, TApiKey, TBatchItem, TLinkItem, TCampaignItem } from '../../types'
import TAddLinks from '../../types/modules/batch/add-links'
import TGetLinks from '../../types/modules/batch/get-links'
import { crypto } from '../../utils'
import { prepareAssets } from '../../helpers'
import { batchesApi } from '../../api'

class Batch implements IBatch {
  data: TBatchItem
  batchId: string
  claimLinks?: TLinkItem[]
  apiKey: TApiKey
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
    apiKey: TApiKey,
    apiHost: string
  ) {
    this.batchId = batchId
    this.data = data
    this.claimLinks = claimLinks
    this.apiKey = apiKey
    this.encryptionKey = encryptionKey
    this.apiHost = apiHost
    this.claimAppUrl = claimAppUrl
    this.campaignData = campaignData
    this.signerKey = signerKey
  }

  addLinks: TAddLinks = async (assets) => {
    try {
      const transformedAssets = await prepareAssets(
        assets,
        this.signerKey,
        this.encryptionKey,
        this.campaignData.token_standard,
        this.campaignData.token_address,
        this.campaignData.proxy_contract_address,
        this.campaignData.chain_id
      )
      if (!transformedAssets) { return alert('Error with assets') }
      return await batchesApi.addLinks(
        this.apiHost,
        this.apiKey,
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
      const encryptedLinkKey = link.encrypted_link_key
      return {
        link_id: link.link_id,
        claim_link: `${this.claimAppUrl}/#/claim/${crypto.decrypt(encryptedLinkKey, this.encryptionKey)}`
      }
    })
  }
}

export default Batch