import { AxiosResponse } from 'axios'
import { TLinkParams, TLinkStatusResponse, TApiKey } from '../../types'

type TGetLinkParamsResponse = {
  success: boolean,
  data: TLinkParams
}

type TGetLinkStatusResponse = {
  success: boolean,
  data: TLinkStatusResponse
}

type TDeactivateLinkResponse = {
  success: boolean,
  data: TLinkParams
}

type TReactivateLinkResponse = {
  success: boolean,
  data: TLinkParams
}

type TRedeemLinkResponse = {
  success: boolean,
  data: {
    tx_hash: string
  }
}

export type TGetLinkParams = (
  apiHost: string,
  apiKey: TApiKey,
  linkId: string
) => Promise<
  AxiosResponse<
    TGetLinkParamsResponse
  >
>

export type TGetLinkStatus = (
  apiHost: string,
  apiKey: TApiKey,
  linkId: string
) => Promise<
  AxiosResponse<
    TGetLinkStatusResponse
  >
>

export type TDeactivateLink = (
  apiHost: string,
  apiKey: TApiKey,
  linkId: string
) => Promise<
  AxiosResponse<
    TDeactivateLinkResponse
  >
>

export type TRedeemLink = (
  apiHost: string,
  apiKey: TApiKey,
  linkId: string,
  receiverAddress: string,
  receiverSignature: string
) => Promise<
  AxiosResponse<
    TRedeemLinkResponse
  >
>

export type TReactivateLink = (
  apiHost: string,
  apiKey: TApiKey,
  linkId: string
) => Promise<
  AxiosResponse<
    TReactivateLinkResponse
  >
>

export type TRequests = {
  getParams: TGetLinkParams,
  getStatus: TGetLinkStatus,
  deactivateLink: TDeactivateLink,
  reactivateLink: TReactivateLink,
  redeemLink: TRedeemLink
}
