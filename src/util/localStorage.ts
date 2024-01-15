export const available = (): boolean => {
  try {
    window.localStorage.setItem('_LOCAL_STORAGE_TEST', '')
    window.localStorage.removeItem('_LOCAL_STORAGE_TEST')

    return true
  } catch (_) {
    return false
  }
}

export const get = (key: string, fallback?: string): string | null => {
  try {
    const value = window.localStorage.getItem(key)
    return value !== null ? value : fallback ?? null
  } catch (_) {
    return typeof fallback === 'string' ? fallback : null
  }
}

export const set = (key: string, value: string): boolean => {
  try {
    window.localStorage.setItem(key, value)
    return true
  } catch (_) {
    return false
  }
}
