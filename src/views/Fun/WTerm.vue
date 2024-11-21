<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { terminal } from '@/stores'

const emit = defineEmits<{
  (e: 'overrideBreadcrumbs', value: string): void
}>()

const inputElement = ref<HTMLSpanElement>(null)

const { commandHistory, handle, prompt, terminalView } = terminal.useTerminalStore()

// from bottom up
const currentHistory = ref(-1)
const buf = ref('')

onMounted(() => {
  emit('overrideBreadcrumbs', ['wterm', 'user'].toString())
})
</script>

<template>
  <div class="terminal-view" @click="inputElement?.focus?.()">
    <div v-for="(line, index) in terminalView" :key="index">{{ line }}</div>
    <span class="prompt">{{ prompt() }}</span>
    <span class="input" contenteditable ref="inputElement" @keydown="(e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        e.stopPropagation()

        handle(e.target.textContent)

        e.target.textContent = ''

        currentHistory = -1
        buf = ''
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        e.stopPropagation()

        if (currentHistory >= commandHistory.length - 1)
          return

        if (currentHistory === -1)
          buf = e.target.textContent

        currentHistory++

        e.target.textContent = commandHistory[
          commandHistory.length - 1 - currentHistory
        ]
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        e.stopPropagation()

        if (currentHistory === -1)
          return

        currentHistory--

        if (currentHistory === -1)
          e.target.textContent = buf
        else
          e.target.textContent = commandHistory[
            commandHistory.length - 1 - currentHistory
          ]
      }
    }"></span>
  </div>
</template>

<style scoped lang="less">
.input {
  margin-left: .5em;
}
</style>
