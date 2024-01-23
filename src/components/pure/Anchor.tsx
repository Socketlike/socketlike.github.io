import React from 'react'

import { globalEvents } from '@util'

export const Anchor = ({
  href,
  real,
  target,
  className,
  children,
}: {
  href: string
  real?: boolean
  target?: string
  className?: string
  children?: React.ReactNode
}): React.ReactElement => (
  <a
    href={href}
    target={target}
    onClick={(event) => {
      if (real) return

      event.preventDefault()
      event.stopPropagation()

      history.pushState({}, '', href)

      globalEvents.emit('pageUpdate')
    }}
    className={className}>
    {children}
  </a>
)
