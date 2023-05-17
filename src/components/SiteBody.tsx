import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

export default () => (
  <div className='site-body'>
    <span>
      Hi! I'm{' '}
      <OverlayTrigger
        placement='top'
        delay={{ show: 250, hide: 400 }}
        overlay={(props) => (
          <Tooltip id='name-tooltip' {...props}>
            Other aliases: Socketlike, EvelynXII
          </Tooltip>
        )}>
        <span className='block'>Evelyn</span>
      </OverlayTrigger>
      .
      <br />
      I'm a very typical and shy person who loves watching over mundane human activities and{' '}
      <OverlayTrigger
        placement='top'
        delay={{ show: 250, hide: 400 }}
        overlay={(props) => (
          <Tooltip id='projects-tooltip' {...props}>
            I make things using TypeScript (sometimes JavaScript) and C++
          </Tooltip>
        )}>
        <span className='block'>programming</span>
      </OverlayTrigger>
      .
      <br />
      <br />
      Welcome to my humble GitHub Pages!
      <br />
      There is mostly nothing here yet, as it is used for{' '}
      <OverlayTrigger
        placement='top'
        delay={{ show: 250, hide: 400 }}
        overlay={(props) => (
          <Tooltip id='projects-tooltip' {...props}>
            This GitHub Pages is used for: SpotifyModal preview GIF, a modified version of Sublime
            Text's Discord RPC plugin
          </Tooltip>
        )}>
        <span className='block'>almost</span>
      </OverlayTrigger>{' '}
      nothing 😓
    </span>
  </div>
)
