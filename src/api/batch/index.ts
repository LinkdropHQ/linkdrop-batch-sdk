import axios from 'axios'
import { TRequests } from './types'
import { defineRequestKeyHeader } from '../../helpers'

const requests: TRequests = {
  getBatches: (
    apiHost,
    apiKey,
    campaignSig,
    campaignId
  ) => {
    const headers = defineRequestKeyHeader(campaignSig, apiKey)
    return axios.get(`${apiHost}/api/v2/dashboard/linkdrop/campaigns/${campaignId}/batches`, {
      headers,
    })
  },
  getBatch: (
    apiHost,
    apiKey,
    campaignSig,
    campaignId,
    batchId
  ) => {
    const headers = defineRequestKeyHeader(campaignSig, apiKey)
    return axios.get(`${apiHost}/api/v2/dashboard/linkdrop/campaigns/${campaignId}/batches/${batchId}`, {
      headers,
    })
  },
  createBatch: (
    apiHost,
    apiKey,
    campaignSig,
    campaignId,
    claimLinks,
    batchDescription
  ) => {
    const headers = defineRequestKeyHeader(campaignSig, apiKey)
    return axios.post(`${apiHost}/api/v2/dashboard/linkdrop/campaigns/${campaignId}/save-batch`, {
      claim_links: claimLinks,
      batch_description: batchDescription
    }, {
      headers
    })
  },
  addLinks: (
    apiHost,
    apiKey,
    campaignSig,
    campaignId,
    batchId,
    claimLinks,
  ) => {
    const headers = defineRequestKeyHeader(campaignSig, apiKey)
    return axios.post(`${apiHost}/api/v2/dashboard/linkdrop/campaigns/${campaignId}/batches/${batchId}/add-links `, {
      claim_links: claimLinks
    }, {
      headers
    })
  }
}

export default requests