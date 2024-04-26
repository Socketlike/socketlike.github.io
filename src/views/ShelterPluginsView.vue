<script setup lang="ts">
import { useFetch } from '@/composables'

const { json: response, error } = useFetch<
  Record<string, { name?: string; author?: string; description?: string; hash?: string }>
>(new URL('/shelter-plugins/index.json', window.location.origin))
</script>

<template>
  <div>
    here's a list of plugins i made for <a href="https://github.com/uwu/shelter">shelter</a>:
  </div>
  <br />
  <template v-if="response">
    <template
      v-for="(manifest, name) in response"
      :key="`${name}-${manifest?.hash || `nohash-${Math.random().toString(36).slice(2)}`}`"
    >
      <section-block :label="name" variant="info">
        <div>
          by <code>{{ manifest?.author || 'unknown' }}</code>
        </div>
        <br />
        <section-block>{{ manifest?.description || 'no description' }}</section-block>
        <br />
      </section-block>
    </template>
  </template>
  <template v-else-if="error">
    <div class="c-red-f">an error occurred while loading my shelter plugin list!</div>
    <section-block label="stacktrace">{{ error?.toString?.() || 'unknown error' }}</section-block>
  </template>
  <template v-else>loading...</template>
  <br />
</template>
