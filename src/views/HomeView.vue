<script setup lang="ts">
import RouterLink from '@/components/RouterLink.vue'
</script>

<template>
  <section-block class="warning" label="README" variant="info">
    if you don't know how to read this page, check out the
    <router-link to="/formatting-guide">formatting guide</router-link> first!
  </section-block>

  <br />

  hi! my name is <span data-tooltip="or alternatively, Evelyn">Evie</span>. <br />
  i specialize in doing silly stuff on my (really really underpowered) laptop, for example:
  <ul>
    <li>
      <span data-tooltip="it's the only game i can kinda play on this laptop"
        >playing minecraft</span
      >
    </li>
    <li>
      making stuff in Sublime Text (or
      <span
        data-tooltip="when i feel like torturing myself because it runs
      very horribly on my laptop"
        >VSCodium</span
      >)
    </li>
  </ul>
</template>

<style scoped lang="less"></style>
