export default (css: string): (() => void) & { id: string } => {
  const style = document.createElement('style')

  const id = String(Date.now())

  style.innerText = css
  style.setAttribute('id', id)

  document.head.appendChild(style)

  return Object.assign(() => style.remove(), { id })
}
