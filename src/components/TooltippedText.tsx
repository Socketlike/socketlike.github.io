import React from 'react'
import { OverlayTrigger, Tooltip, OverlayTriggerProps } from 'react-bootstrap'

export const TooltippedText = (props: {
  placement?: OverlayTriggerProps['placement']
  delay?: OverlayTriggerProps['delay']
  tooltip: React.ReactNode
  children: React.ReactNode
}): JSX.Element => (
  <OverlayTrigger
    placement={props.placement || 'top'}
    delay={props.delay || { show: 250, hide: 400 }}
    overlay={(overlayProps) => (
      <Tooltip id='projects-tooltip' {...overlayProps}>
        {props.tooltip}
      </Tooltip>
    )}>
    <span className='block'>{props.children}</span>
  </OverlayTrigger>
)
