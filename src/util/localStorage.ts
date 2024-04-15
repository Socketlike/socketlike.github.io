export const available = (): boolean => {
  try {
    window.localStorage.setItem('_LOCAL_STORAGE_TEST', '')
    window.localStorage.removeItem('_LOCAL_STORAGE_TEST')
  } catch (_) {
    return false
  }

  return true
}

export const getItem = (key: string, fallback?: string | null): string | null => {
  let value: string | null

  try {
    const res = window.localStorage.getItem(key)
    value = res ?? fallback ?? null
  } catch (_) {
    value = fallback ?? null
  }

  return value
}

export const setItem = (key: string, value: string): boolean => {
  try {
    window.localStorage.setItem(key, value)
  } catch (_) {
    return false
  }

  return true
}

export const deleteItem = (key: string): boolean => {
  try {
    window.localStorage.deleteItem(key)
  } catch (_) {
    return false
  }

  return true
}

/**
 * @param items - key: fallback
 * @description
 * ```js
 * getMultipleItems({ '_KEY': 'fallback', ... }) // if '_KEY' is nullish then 'fallback' is returned
 * ```
 */
export const getMultipleItems = (
  items: Record<string, string | undefined | null>,
): Record<string, string | null> =>
  Object.entries(items)
    .map(([key, fallback]): [string, string | null] => [key, getItem(key, fallback)])
    .reduce<Record<string, string | null>>((acc, [key, res]) => {
      acc[key] = res
      return acc
    }, {})

/**
 * @param items - key: value
 */
export const setMultipleItems = (items: Record<string, string>): Record<string, boolean> =>
  Object.entries(items)
    .map(([key, value]): [string, boolean] => [key, setItem(key, value)])
    .reduce<Record<string, boolean>>((acc, [key, res]) => {
      acc[key] = res
      return acc
    }, {})

export const deleteMultipleItems = (items: string[]): Record<string, boolean> =>
  items
    .map((key): [string, boolean] => [key, deleteItem(key)])
    .reduce<Record<string, boolean>>((acc, [key, res]) => {
      acc[key] = res
      return acc
    }, {})

export default {
  available,
  getItem,
  getMultipleItems,
  setItem,
  setMultipleItems,
  deleteItem,
  deleteMultipleItems,
}
