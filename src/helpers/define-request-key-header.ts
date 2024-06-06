type TDefineRequestKeyHeader = (
  campaignSig: string,
  apiKey: string
) => Record<string, string>

const defineRequestKeyHeader: TDefineRequestKeyHeader = (
  campaignSig,
  apiKey
) => {
  const headers = {}
  headers[
    'X-CAMPAIGN-KEY'
  ] = campaignSig

  if (apiKey) {
    headers['authorization'] = `Bearer ${apiKey}`
  }

  return headers
}

export default defineRequestKeyHeader
