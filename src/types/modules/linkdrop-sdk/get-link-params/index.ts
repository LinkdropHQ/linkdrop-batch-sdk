import { TLinkParams } from "../../.."

export type TGetLinkParams = (linkId: string) => Promise<TLinkParams | void>