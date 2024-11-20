type TDefineRequestKeyHeader = (
  apiKey: string,
  campaignSig?: string
) => Record<string, string>

const defineRequestKeyHeader: TDefineRequestKeyHeader = (
  apiKey,
  campaignSig
) => {
  const headers = {}

  if (campaignSig) {
    headers[
      'X-CAMPAIGN-KEY'
    ] = campaignSig
  }
  

  if (apiKey) {
    headers['authorization'] = `Bearer ${apiKey}`
  }

  return headers
}

export default defineRequestKeyHeader