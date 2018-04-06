// filter is an fuction
export default (value) => {
  const date = new Date(value)
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // weekday: 'long',
    timezone: 'UTC'
  }
  return date.toLocaleString('ru', options) // 'ru'
}
