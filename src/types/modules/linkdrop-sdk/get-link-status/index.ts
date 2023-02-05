import { TLinkStatusResult } from '../../../index'

export type TGetLinkStatus = (linkId: string) => Promise<TLinkStatusResult | undefined>