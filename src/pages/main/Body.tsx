import React from 'react'
import { TooltippedText } from '@components/TooltippedText'

export const Body = (): JSX.Element => (
  <div className='index-body'>
    <span>
      Hi! I'm <TooltippedText tooltip='Other aliases: Socketlike, EvelynXII'>Evelyn</TooltippedText>
      .
      <br />
      I'm a very boring and confusing person who enjoys{' '}
      <TooltippedText tooltip='I make things using TypeScript (sometimes JavaScript) and C++'>
        programming
      </TooltippedText>
      .
      <br />
      <br />
      Welcome to my GitHub Pages!
      <br />
      <br />
      Down here is a list of possible pages that you can explore:
      <br />
      <ul>
        <li>
          <a className='block' href='./404'>
            /404
          </a>
        </li>
        <li>
          <a className='block' href='./replugged'>
            /replugged
          </a>
          <ul>
            <li>
              <a className='block' href='./replugged/addon.schema.json'>
                /addon.schema.json
              </a>
            </li>
            <li>
              <a className='block' href='./replugged/plugin.schema.json'>
                /plugin.schema.json
              </a>
            </li>
            <li>
              <a className='block' href='./replugged/theme.schema.json'>
                /theme.schema.json
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </span>
  </div>
)
