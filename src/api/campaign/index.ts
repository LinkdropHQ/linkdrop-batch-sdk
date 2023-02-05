import axios from 'axios'
import { TRequests } from './types'
import { defineRequestKeyHeader } from '../../helpers'

const requests: TRequests = {
  getCampaign: (
    apiHost,
    apiKey,
    campaignId
  ) => {
    const headers = defineRequestKeyHeader(apiKey)
    return axios.get(`${apiHost}/api/v1/dashboard/linkdrop/campaigns/${campaignId}`, {
      headers
    })
  }
}

export default requests