export default (
  type: string,
  props?: Record<string, any>,
  children?: Array<Node | HTMLElement> | Node | HTMLElement,
) => {
  const element = document.createElement(type)

  if (props)
    for (const key in props) {
      if (key === 'children') {
        children = [
          ...(Array.isArray(props['children']) ? props['children'] : [props['children']]),
          ...(Array.isArray(children) ? children : [props['children']]),
        ].filter((child) => ![undefined, null].includes(child))

        continue
      }

      // @ts-expect-error -- it doesn't really matter if `key` doesn't exist in element
      element[key] = props[key]
    }

  if (children instanceof Node || children instanceof HTMLElement) element.append(children)
  else if (Array.isArray(children)) element.append(...children)

  return element
}
