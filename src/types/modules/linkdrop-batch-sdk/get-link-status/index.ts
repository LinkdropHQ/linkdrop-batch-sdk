import { TLinkStatusResult } from '../../../index'

export type TGetLinkStatus = (claimCode: string) => Promise<TLinkStatusResult | undefined>