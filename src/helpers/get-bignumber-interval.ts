import { bignumber, subtract } from 'mathjs'

type TGetBigNumberInterval = (
  initial: string,
  final: string
) => {
  prefix: string,
  suffix: string,
  limit: number,
  diff: string,
  prefixOffset: string
}

const getBignumberInterval: TGetBigNumberInterval = (initial: string, final: string) => {
  const initialBN = bignumber(initial)
  const finalBN = bignumber(final)
  const result = subtract(finalBN, initialBN)
  const diff = String(result)
  const prefix = initial.slice(0, Number(`-${diff.length}`))
  const suffix = initial.slice(Number(`-${diff.length}`))
  const limit = Number(diff)
  const initialDigitsCount = initial.length
  const prefixOffset = String(prefix + new Array(initialDigitsCount - prefix.length).fill('0').join('') || 0)
  return {
    prefix,
    suffix,
    limit,
    diff,
    prefixOffset
  }
}

console.log({
  getBignumberInterval
})


export default getBignumberInterval