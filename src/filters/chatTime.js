export default (value) => {
  const chatTime = new Date(value)
  return chatTime.toLocaleString('en-US', {
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric'
  })
}
