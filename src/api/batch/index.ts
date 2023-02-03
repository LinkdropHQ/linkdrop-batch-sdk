import axios from 'axios'
import { TRequests } from './types'
import { defineRequestKeyHeader } from '../../helpers'

const requests: TRequests = {
  getBatches: (
    apiHost,
    apiKey,
    campaignId
  ) => {
    const headers = defineRequestKeyHeader(apiKey)
    return axios.get(`${apiHost}/dashboard/linkdrop/campaigns/${campaignId}/batches`, {
      headers,
    })
  },
  getBatch: (
    apiHost,
    apiKey,
    campaignId,
    batchId
  ) => {
    const headers = defineRequestKeyHeader(apiKey)
    return axios.get(`${apiHost}/dashboard/linkdrop/campaigns/${campaignId}/batches/${batchId}`, {
      headers,
    })
  },
  createBatch: (
    apiHost,
    apiKey,
    campaignId,
    claimLinks,
    sponsored,
    batchDescription
  ) => {
    const headers = defineRequestKeyHeader(apiKey)
    return axios.post(`${apiHost}/dashboard/linkdrop/campaigns/${campaignId}/save-batch`, {
      claim_links: claimLinks,
      sponsored,
      batch_description: batchDescription
    }, {
      headers
    })
  },
  addLinks: (
    apiHost,
    apiKey,
    campaignId,
    batchId,
    claimLinks,
  ) => {
    const headers = defineRequestKeyHeader(apiKey)
    return axios.post(`${apiHost}/dashboard/linkdrop/campaigns/${campaignId}/batches/${batchId}/add-links `, {
      claim_links: claimLinks
    }, {
      headers
    })
  }
}

export default requests