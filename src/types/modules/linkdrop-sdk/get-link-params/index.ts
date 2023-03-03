import { TLinkParams } from "../../.."

export type TGetLinkParams = (claimCode: string) => Promise<TLinkParams | void>