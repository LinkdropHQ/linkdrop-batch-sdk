import { TTokenType } from '../../../token-type'
import TCampaign from '../../campaign' 

export type TGetCampaign = (
  campaign_id: string,
  signer_key: string,
  encryption_key: string
) => Promise<TCampaign | void>