import React from 'react'
import { OverlayTrigger, Tooltip, OverlayTriggerProps } from 'react-bootstrap'

export default (props: {
  placement?: OverlayTriggerProps['placement']
  delay?: OverlayTriggerProps['delay']
  tooltip: React.ReactNode
  children: JSX.Element
}) => (
  <OverlayTrigger
    placement={props.placement || 'top'}
    delay={props.delay || { show: 250, hide: 400 }}
    overlay={(overlayProps) => (
      <Tooltip id='projects-tooltip' {...overlayProps}>
        {props.tooltip}
      </Tooltip>
    )}>
    {props.children}
  </OverlayTrigger>
)
