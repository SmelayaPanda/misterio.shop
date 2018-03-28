// filter is an fuction
export default (value) => {
  const date = new Date(value)
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric'
  }
  return date.toLocaleString('en-US', options) // 'ru'
}
