import { TLinkParams } from "../../../types"

export type TGetLinkParams = (linkId: string) => Promise<TLinkParams | undefined>