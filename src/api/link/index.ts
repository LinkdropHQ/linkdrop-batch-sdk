import axios, { AxiosResponse } from 'axios'
import { apiUrl } from '../../configs'
import { TRequests } from './types'

const linkApi = axios.create({
  baseURL: apiUrl
})

const requests: TRequests = {
  getParams: (
    linkId: string,
  ) => {
    return linkApi.get(`/user/claim-params/${linkId}`, {
      withCredentials: true
    })
  },
  getStatus: (linkId: string) => linkApi.get(`/user/claim-status/${linkId}`, {
    withCredentials: true
  })
}

export default requests