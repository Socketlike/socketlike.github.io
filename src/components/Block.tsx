import React from 'react'

import { mergeClassNames } from '@util'

export const Block = (props?: {
  label: string
  className?: string
  children?: React.ReactNode
}): React.ReactElement => (
  <fieldset className={mergeClassNames('block', props?.className)}>
    {props?.label && <legend className='label'>{props.label}</legend>}
    {props?.children}
  </fieldset>
)
