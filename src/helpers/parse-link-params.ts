type TParseLinkParams = (link: string) => Record<string, string>
export const parseLinkParams: TParseLinkParams = (link) => {
  const onlyVariablesPart = link.split('?')[1]
  if (!onlyVariablesPart) return {}
  return onlyVariablesPart.split('&').reduce((sum, item) => {
    const variablePair = item.split('=')
    sum[variablePair[0]] = variablePair[1]
    return sum
  }, {})
}

  