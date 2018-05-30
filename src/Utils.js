export const debugLog = name => res => {
  console.log(name, res)
  return res
}
