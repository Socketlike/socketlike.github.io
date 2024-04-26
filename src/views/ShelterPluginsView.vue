<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFetch } from '@/composables'

const origin = ref(import.meta.env.DEV ? 'https://evie.is-a.dev' : window.location.origin)

const { json: response, error } = useFetch<
  Record<string, { name?: string; author?: string; description?: string; hash?: string }>
>(new URL('/shelter-plugins/index.json', origin.value))

watch(
  error,
  () => {
    if (error.value) console.error(error.value)
  },
  {
    once: true,
  },
)
</script>

<template>
  <div v-if="response">
    <div>
      here's a list of plugins i made for <a href="https://github.com/uwu/shelter">shelter</a>:
    </div>
    <br />

    <div
      :class="`plugins${Object.keys(response).length > 1 ? ' multiple' : ''}`"
      v-if="Object.keys(response).length"
    >
      <section-block
        v-for="(manifest, name) in response"
        :key="`${name}-${manifest?.hash || `nohash-${Math.random().toString(36).slice(2)}`}`"
        :label="name"
        variant="info"
      >
        <div>
          <span v-tooltip="'copy this url into shelter'">install link</span>:
          <a :href="`${origin}/shelter-plugins/${name}/`">{{
            `${origin}/shelter-plugins/${name}/`
          }}</a>
        </div>
        <br />

        <section-block>{{ manifest?.description || 'no description' }}</section-block>
        <br />

        <div>
          author(s): <code>{{ manifest?.author || 'unknown' }}</code>
          <br />

          source:
          <a :href="`https://github.com/Socketlike/shelter-plugins/tree/main/plugins/${name}`"
            >github</a
          >
          <br />

          hash:
          <code>{{ manifest?.hash || 'no hash' }}</code>
        </div>
      </section-block>
    </div>
    <div class="c-fg" v-else>there's nothing here...</div>
  </div>
  <template v-else-if="error">
    <div class="c-red-f">an error occurred while loading my shelter plugin list!</div>
    <br />

    <section-block variant="error" label="stacktrace">
      <template v-if="error?.stack">{{ error.stack }}</template>
      <span class="c-fg" v-else><code>.stack</code> is empty. check console instead.</span>
    </section-block>
  </template>
  <template v-else>loading...</template>
  <br />
</template>

<style scoped lang="less">
.plugins.multiple {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

@media screen and (max-width: 767px) {
  .plugins.multiple {
    display: block;
  }
}
</style>
