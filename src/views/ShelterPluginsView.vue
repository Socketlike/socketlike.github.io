<script setup lang="ts">
import { useFetch } from '@/util'

const { json: response, error } = useFetch<
  Record<string, { name?: string; author?: string; description?: string; hash?: string }>
>(new URL('/shelter-plugins/index.json', window.location.origin))
</script>

<template>
  welcome to my domain of <a href="https://github.com/uwu/shelter">shelter</a>
  <span v-tooltip="'well, currently it\'s just a list of my shelter plugins at the moment'"
    >shenanigans</span
  >!
  <br />
  here's a list of plugins i made for shelter:
  <br />
  <template v-if="response">
    <template
      v-for="(manifest, name) in response"
      :key="`${name}-${manifest?.hash || `nohash-${Math.random().toString(36).slice(2)}`}`"
    >
      <section-block :label="name" variant="info">
        by {{ manifest?.author || 'unknown' }}
        <br />
        {{ manifest?.description || 'no description' }}
        <br />
      </section-block>
    </template>
  </template>
  <template v-else-if="error">
    <div class="c-red-f">an error occurred while loading my shelter plugin list!</div>
    <section-block label="stacktrace">{{ error?.toString?.() || 'unknown error' }}</section-block>
  </template>
  <template v-else>loading...</template>
</template>
