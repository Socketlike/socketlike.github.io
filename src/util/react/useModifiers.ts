import React from 'react'

import { useInterval } from './useInterval'

export const getModifiers = (): Array<'birthday' | 'christmas' | 'halloween' | 'newYear'> => {
  const date = new Date()

  const modifiers: Array<'birthday' | 'christmas' | 'halloween' | 'newYear'> = []

  if (
    (date.getUTCMonth() + 1 === 2 && date.getUTCHours() >= 15 && date.getUTCDate() === 9) ||
    (date.getUTCHours() <= 15 && date.getUTCDate() === 10)
  )
    modifiers.push('birthday')

  if (date.getUTCMonth() + 1 === 12) modifiers.push('christmas')

  if (date.getUTCMonth() + 1 === 10) modifiers.push('halloween')

  if (date.getUTCMonth() + 1 === 1) modifiers.push('newYear')

  return modifiers
}

export const useModifiers = (): ReturnType<typeof getModifiers> => {
  const [modifiers, setModifiers] = React.useState(getModifiers())

  useInterval(() => setModifiers(getModifiers()), 3600 * 1000)

  return modifiers
}
