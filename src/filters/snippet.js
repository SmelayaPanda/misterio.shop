export default (value, maxLength) => {
  let val
  if (value.length > maxLength) {
    val = value.slice(0, maxLength) + ' . . .'
  } else {
    val = value
  }
  return val
}
