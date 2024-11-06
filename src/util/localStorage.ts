export const available = ((): boolean => {
  try {
    localStorage.setItem?.('__TEST__', '')

    if (typeof localStorage.getItem('__TEST__') === 'string') {
      localStorage.removeItem('__TEST__')

      return true
    }
  } catch (e) {}

  return false
})()

export const get = (
  key: string,
  fallback: string | undefined | null,
): string | undefined | null => {
  return available ? (localStorage.getItem(key) ?? fallback) : fallback
}

export const set = (key: string, value: string): boolean => {
  if (!available) return false

  localStorage.setItem(key, value)

  return true
}

export const del = (key: string): boolean => {
  if (!available) return false

  localStorage.removeItem(key)

  return true
}
