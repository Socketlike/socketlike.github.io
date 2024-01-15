interface Page {
  match: (pathname: string[]) => boolean
  Page: (props: { pathname: string[] }) => React.ReactElement
}

interface Theme {
  '--background': string | null
  '--foreground': string | null
  '--foreground-focused': string | null
  '--foreground-unfocused': string | null
  '--red': string | null
  '--green': string | null
  '--yellow': string | null
  '--gray': string | null
  '--lightblue': string | null
}
