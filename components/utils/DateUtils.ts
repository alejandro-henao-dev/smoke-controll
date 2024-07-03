export const getIsoDateWithoutTime = (date:Date) => {
  return date.toISOString().split("T")[0]
}