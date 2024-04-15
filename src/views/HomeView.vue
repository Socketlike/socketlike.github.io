<script setup lang="ts"></script>

<template>
  hi! my name is <span v-tooltip="'or alternatively, Evelyn'">Evie</span>.<br />
  i specialize in doing silly stuff on my (really really underpowered) laptop, for example:
  <ul>
    <li>
      <span v-tooltip="`it's the only game i can kinda play on this laptop`"
        >playing minecraft</span
      >
    </li>
    <li>
      making stuff in Sublime Text (or
      <span
        v-tooltip="'when i feel like torturing myself because it runs very horribly on my laptop'"
        >VSCodium</span
      >)
    </li>
  </ul>
</template>

<style scoped lang="less"></style>
