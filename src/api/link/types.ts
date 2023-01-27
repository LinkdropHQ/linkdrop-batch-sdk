import { AxiosResponse } from 'axios'
import { TLinkParams, TLinkStatusResponse } from '../../types'

type TGetLinkParamsResponse = {
  success: boolean,
  data: TLinkParams
}

type TGetLinkStatusResponse = {
  success: boolean,
  data: TLinkStatusResponse
}

export type TGetLinkParams = (
  linkId: string
) => Promise<
  AxiosResponse<
    TGetLinkParamsResponse
  >
>

export type TGetLinkStatus = (
  linkId: string
) => Promise<
  AxiosResponse<
    TGetLinkStatusResponse
  >
>

export type TRequests = {
  getParams: TGetLinkParams,
  getStatus: TGetLinkStatus
}
