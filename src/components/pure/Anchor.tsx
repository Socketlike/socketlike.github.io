import React from 'react'

import { globalEvents } from '@util'

export const Anchor = ({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children?: React.ReactNode
}): React.ReactElement => (
  <a
    href={href}
    key={href}
    onClick={(event) => {
      event.preventDefault()
      event.stopPropagation()

      history.pushState({}, '', href)

      globalEvents.emit('pageUpdate')
    }}
    className={className}>
    {children}
  </a>
)
