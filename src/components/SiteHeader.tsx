import React from 'react'
import random from 'random'

import { useInterval } from '@util'

import { Block } from './Block'

const splashTextUpdateTarget = new EventTarget()

export const splashText = [
  "everything went wrong and i don't know why",
  "i hope you're not just refreshing the page to see all of the splash text because that's silly",
  "i'm horrid at literature",
  "i'm not good at designing websites",
  "i'm tired",
  "what's wrong?",
  "you're welcome!",
  '"i envy other people\'s art" ~ my sister',
  'can someone please tell me which RPG game i should play next',
  'every day is the same',
  'everybody is silly',
  'everything is (not) going to plan',
  'everything is going to plan!',
  'everything this website consists of is exposed on window',
  'god my head hurts and i have no idea why',
  'how can i help?',
  'i hate chemistry',
  'i have a penguin plushie and i treat it like my child',
  'i ran out of things to write about',
  'i wish i could draw',
  'oh yeah i also have anger issues',
  'sleepy',
  'this site layout is supposed to resemble spotify-tui in the terminal',
  'what am i even doing',
  'where did my time go',
  'you are silly',
  "what's so good about hacktoberfest?",
  'i strive for minimalism!',
  '',
  () => {
    const hour = new Date().getHours()

    if (hour <= 12) return 'good morning!'
    else if (hour <= 18) return 'good afternoon!'

    return 'good evening!'
  },
  ...[
    'Minecraft',
    'cats',
    'penguins',
    'sci-fi',
    ['dogs', '(only some of them)'],
    ['pretty skies', '(and clouds)'],
  ].map((entry) =>
    Array.isArray(entry) ? `i love ${entry.shift()}! ${entry.join(' ')}` : `i love ${entry}!`,
  ),
  ...[
    'that i spend most of my time doing absolutely nothing',
    'that this text changes every 30 minutes that you stay on this page?',
    'that colorless is a color? (according to "noah the magic")',
  ].map((entry) => `did you know ${entry}`),
  ...[
    'A Certain Magical Index',
    'A Certain Scientific Railgun',
    'DYSMANTLE',
    'Psycho-Pass',
    'Serial Experiments Lain',
    'Slay the Spire',
    'Sword Art Online',
    ['BAIXO', 'by xxanteria'],
    ['BLACK NAIL', 'by Ken Arai'],
    ['CORRUPTED AUTOMATA', 'by AZALI'],
    ['Chronos', 'by STEREO DIVE FOUNDATION'],
    ['Closely', 'by Domchez'],
    ['Dopamine Death Dream', 'by Drawn To The Sky'],
    ['Finale', 'by Dante Red (alt. ericdoa)'],
    ['Flashcord', 'also known as the Performance Destroyer 9000™'],
    ['Floodlights', 'by Mittsies'],
    ['Forgotten', 'by Ollie'],
    ['Fátima', 'by Kanato Ito'],
    ['HOLLOW HUNGER', 'by OxT'],
    ['Hole In My Heart', 'by Foreign Forest'],
    ['LOCK OUT', 'by $atori Zoom and Kalono'],
    ['Latent Noise', 'by The Algorithm and Extra Terra'],
    ['Light Switch', 'by Charlie Puth'],
    ['Loaded', 'by oversly'],
    ['Messed Up', 'by Cassette Tapes'],
    ['Mr.Fixer', 'by Sou'],
    ['Needs', 'by Verzache'],
    ['New Machines', 'by HOME'],
    ['Overlord', 'the anime'],
    ['Phantom Feelings', 'by artemis orion and swablu'],
    ['RIPSTICK', 'by $atori Zoom'],
    ['Reckless', 'by Lund'],
    ['Record Player (with AJR)', 'by Daisy the Great and AJR'],
    ['Resonance', 'by HOME'],
    ['Seams', 'by INTRN'],
    ['Silence', 'by Before You Exit'],
    ['Starboy', 'by The Weeknd and Daft Punk'],
    ['Stareater', 'by Drawn To The Sky'],
    ['Steins;Gate', 'and', '"Steins;Gate 0"'],
    ['Street Mech', 'by Irving Force'],
    ['System Shutdown', 'by Airglow'],
    ['Task Force', 'by Downfvll, Prompto and Sugs'],
    ['Ten Thousand Stars', 'by CircusP'],
    ['The Scene Is Dead (MASTER BOOT RECORD Remix)', 'by MASTER BOOT RECORD and Dubmood'],
    ['Toronto - Instrumental', 'by Sonya'],
    ['Troubles of Today', 'by KID E$s and Powfu'],
    ['Uncontrollable', 'by Kanato Ito'],
    ['WORLDWIDE', 'by X-WAYNE'],
    ['ZEPHANIAH', 'by AZALI and Arcerion'],
    ['black bullet', 'by fripSide'],
    ['crossing field', 'by LiSA'],
    ['eighty-five', 'by again&again'],
    ['evanesce', 'by oc and Dylan Longworth'],
    ['fuckboy', 'by brakence'],
    ['hours', 'by again&again'],
    ['karma', 'by juno'],
    ['lain', 'by C3FF31N3'],
    ['lay low', 'by Helve'],
    ['midas touch', 'by One Hope and TRAILS'],
    ['only my railgun', 'by fripSide'],
    ['save your love', 'by Ouse'],
    ['scared', 'by sammy rash'],
    ['smile more', 'by sammy rash'],
    ['stadium lights (demo)', 'by Ren Downfelt'],
    ['toxic love', 'by One Hope and Vorsa'],
    ['under my sleeve', 'by One Hope'],
    ['your place', 'by Ren Downfelt'],
  ].map((entry) =>
    Array.isArray(entry)
      ? `also check out "${entry.shift()}", ${entry.join(' ')}!`
      : `also check out "${entry}"!`,
  ),
]

// for debugging purposes
export const forceUpdateSplashText = (): boolean =>
  splashTextUpdateTarget.dispatchEvent(new CustomEvent('update'))

export const useSplashText = (): string | (() => string) => {
  const [current, setCurrent] = React.useState(random.choice(splashText)!)

  useInterval(() => setCurrent(random.choice(splashText)!), 3600 * 1000)

  React.useEffect(() => {
    const listener = () => setCurrent(random.choice(splashText)!)

    splashTextUpdateTarget.addEventListener('update', listener)

    return () => splashTextUpdateTarget.removeEventListener('update', listener)
  }, [])

  return current
}

export const SiteHeader = (): React.ReactElement => {
  const currentSplashText = useSplashText()

  return (
    <div className='site-header'>
      <Block className='site-name' label='header'>
        <span className='content'>evie's pages</span>{' '}
        <span className='splash-text'>
          <span className='separator'>|</span>{' '}
          <span className='content'>
            {typeof currentSplashText === 'function' ? currentSplashText() : currentSplashText}
          </span>
        </span>
      </Block>
      <Block className='pages' label='pages'>
        {[
          ['home', '/'],
          ['replugged', '/replugged/'],
          ['config', '/config'],
        ].map(([name, path]) =>
          location.pathname === path ? (
            <span className='text-bold' key={path}>
              {name}
            </span>
          ) : (
            <a href={path} key={path}>
              {name}
            </a>
          ),
        )}
      </Block>
    </div>
  )
}
