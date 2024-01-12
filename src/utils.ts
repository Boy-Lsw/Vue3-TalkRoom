export const formatTime = (time: Date) => {
  const hours = String(time.getHours()).padStart(2, '0')
  const minutes = String(time.getMinutes()).padStart(2, '0')
  const seconds = String(time.getSeconds()).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

export const toBottom = (dom: any) => {
  setTimeout(() => {
    dom.scrollTo(0, dom.scrollHeight)
  }, 0)
}
