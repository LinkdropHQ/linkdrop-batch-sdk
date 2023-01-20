import axios from 'axios'
import { apiUrl } from '../../configs'

const linkApi = axios.create({
  baseURL: apiUrl
})

const requests = {
  getParams: (linkId: string) => linkApi.get(`/user/claim-params/${linkId}`, { withCredentials: true })
}

export default requests