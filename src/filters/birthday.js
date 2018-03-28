export default (value) => {
  const date = new Date(value)
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return date.toLocaleString('en', options)
}
