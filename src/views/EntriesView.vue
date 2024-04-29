<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { entries, entriesCategorized } from '@/entries'

const route = useRoute()

const entry = computed(() => {
  if (Array.isArray(route.params.entry)) return route.params.entry.join('/')

  return route.params.entry
})
</script>

<template>
  <template v-if="!entry">
    <template v-if="Object.keys(entries).length">
      <template
        v-for="[year, list] of Object.entries(entriesCategorized).sort(
          ([a], [b]) => Number(b) - Number(a),
        )"
        :key="year"
      >
        <div class="bold">{{ year }}:</div>
        <ul>
          <li v-for="({ attributes }, key) in list" :key="key">
            <router-link
              :to="{
                // @ts-expect-error - it cannot be null here
                name: $route.name,
                params: { entry: key },
              }"
              ><template v-if="typeof attributes?.date === 'number'"
                ><code>{{
                  new Date(attributes.date).toLocaleString(undefined, {
                    month: '2-digit',
                    day: '2-digit',
                    hourCycle: 'h12',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                }}</code>
                <span>{{ ' ' }}</span></template
              >{{ key }}</router-link
            >
          </li>
        </ul>
      </template>
    </template>
    <template v-else
      >nothing's really <span class="italic">here</span> yet, like,
      <span class="italic">really really here</span> yet.
      <br />
      <br />
      maybe there will be something here in the future?</template
    >
  </template>
  <template v-if="entry in entries">
    <section-block label="entry info" variant="info">
      <div>
        name: <code>{{ entry }}</code>
      </div>
      <div v-if="typeof entries[entry].attributes?.date === 'number'">
        written on:
        <code>{{
          new Date(entries[entry].attributes.date).toLocaleString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hourCycle: 'h12',
            hour: '2-digit',
            minute: '2-digit',
          })
        }}</code>
      </div>
    </section-block>
    <component :is="entries[entry].VueComponent"></component>
    <router-link
      :to="{
        // @ts-expect-error - it cannot be null here
        name: $route.name,
      }"
      >go back</router-link
    >
  </template>
</template>
