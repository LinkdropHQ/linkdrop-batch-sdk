import { TLinkStatusResponse } from '../../../index'

export type TGetLinkStatus = (linkId: string) => Promise<TLinkStatusResponse | undefined>