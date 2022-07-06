export function getLocal(key) {
  let data = localStorage.getItem(key)
  try {
    data = JSON.path(key)
  } catch (e) {
    console.log(e)
  }
  return data
}
export function setLocal(key, data) {
  localStorage.setItem(
    key,
    typeof data === 'object' ? JSON.stringify(data) : data
  )
}
