import { TApiKey } from "../types"

type TDefineRequestKeyHeader = (apiKey: TApiKey) => Record<string, string>
const defineRequestKeyHeader: TDefineRequestKeyHeader = (apiKey) => {
  const headers = {}
  headers[
    apiKey.mode === 'client' ? 'x-api-key' : 'x-secret-key'
  ] = apiKey.key
  return headers
}

export default defineRequestKeyHeader
