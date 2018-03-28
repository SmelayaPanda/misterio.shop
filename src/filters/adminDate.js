export default (value) => {
  const date = new Date(value)
  let options = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric'
  }
  return date.toLocaleString('ru', options)
}
