import axios, { AxiosResponse } from 'axios'
import { apiUrl } from '../../configs'
import { TRequests } from './types'

const requests: TRequests = {
  getBatches: (
    apiHost,
    apiKey,
    campaignId
  ) => {
    const headers = {}
    headers[
      apiKey.mode === 'client' ? 'x-api-key' : 'x-secret-key'
    ] = apiKey.key
    return axios.get(`${apiHost}/linkdrop/campaigns/${campaignId}/batches`, {
      headers,
    })
  },
  getBatch: (
    apiHost,
    apiKey,
    campaignId,
    batchId
  ) => {
    const headers = {}
    headers[
      apiKey.mode === 'client' ? 'x-api-key' : 'x-secret-key'
    ] = apiKey.key
    return axios.get(`${apiHost}/linkdrop/campaigns/${campaignId}/batches/${batchId}`, {
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
    const headers = {}
    headers[
      apiKey.mode === 'client' ? 'x-api-key' : 'x-secret-key'
    ] = apiKey.key
    return axios.post(`${apiHost}/linkdrop/campaigns/${campaignId}/save-batch`, {
      claim_links: claimLinks,
      sponsored,
      batch_description: batchDescription
    }, {
      headers
    })
  }
}

export default requests