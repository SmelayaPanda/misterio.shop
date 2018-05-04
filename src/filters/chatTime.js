export default (value) => {
  const chatTime = new Date(value)
  return chatTime.toLocaleString('ru-RU', {
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric'
  })
}
