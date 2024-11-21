import { type Ref, ref, watch } from 'vue'

import { defineStore } from 'pinia'

import { type ParseEntry, parse } from 'shell-quote'

import * as ls from '@/util/localStorage'

const builtins: Record<
  string,
  (
    args: ParseEntry[],
    context: {
      terminalView: Ref<string[]>
      environment: Ref<Record<string, string>>
      username: Ref<string>
      device: Ref<string>
    },
  ) => void
> = {
  echo: (args, { terminalView }) => {
    const content = args.join(' ')

    if (content) terminalView.value.push(content)
  },

  clear: (_, { terminalView }) => {
    terminalView.value.splice(0)
  },

  exit: (_, { terminalView }) => {
    terminalView.value.push('goodbye')

    setTimeout(() => {
      location.assign('/fun')
    }, 1000)
  },

  config: (args, { terminalView, username }) => {
    switch (args[0]) {
      case 'username': {
        switch (args[1]) {
          case 'set': {
            if (!args[2]) terminalView.value.push('fatal: given empty username')
            else {
              username.value = args[2] as unknown as string

              terminalView.value.push(`set username to "${args[2]}"`)
            }

            break
          }

          case 'reset': {
            username.value = 'user'

            terminalView.value.push('reset username to "user"')

            break
          }
        }

        break
      }
    }
  },
}

builtins.logout = builtins.exit

export const useTerminalStore = defineStore('terminal', () => {
  const commandHistory = ref<string[]>([])
  const terminalView = ref<string[]>([])
  const environment = ref<Record<string, string>>({})

  const username = ref(ls.get('wterm.username', 'user') as string)
  const device = ref(ls.get('wterm.device', 'device') as string)

  watch(username, (newUsername) => {
    ls.set('wterm.username', newUsername)
  })

  watch(device, (newDevice) => {
    ls.set('wterm.device', newDevice)
  })

  const handle = (str: string) => {
    const [exec, ...args] = parse(
      str,
      environment as unknown as { readonly [x: string]: string },
    ) as [string, ...ParseEntry[]]

    if (exec in builtins) builtins[exec](args, { terminalView, environment, username, device })
    else terminalView.value.push(`fatal: unknown command "${exec}"`)

    if (str !== commandHistory.value[commandHistory.value.length - 1])
      commandHistory.value.push(str)
  }

  const prompt = () => {
    return `${username.value}@${device.value} >`
  }

  const _parse = (str: string) => {
    return parse(str, environment as unknown as { readonly [x: string]: string })
  }

  return {
    builtins,
    commandHistory,
    environment,
    terminalView,

    username,
    device,

    handle,
    parse: _parse,
    prompt,
  }
})
