import React from 'react'

import { classNameFactory } from '@util'

export const Block = (props?: {
  label: string
  className?: string
  children?: React.ReactNode
}): React.ReactElement => (
  <fieldset className={classNameFactory('block', props?.className)}>
    {props?.label && <legend className='label'>{props.label}</legend>}
    {props?.children}
  </fieldset>
)
