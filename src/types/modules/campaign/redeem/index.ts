export type TRedeem = (code: string, destination: string) => Promise<{
  txHash: string,
  recipient: string
} | void>