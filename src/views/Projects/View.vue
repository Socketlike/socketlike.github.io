<script setup lang="ts">
import { reactive } from 'vue'

import list from './list'

const state = reactive([] as boolean[])
</script>

<template>
  <template v-for="({ name, description, link, label }, index) of list" :key="index">
    <span class="name" @click="() => (state[index] = !state[index])">[{{ name }}]</span>
    <template v-if="label">
      <span class="label" v-if="typeof label === 'string'">{{ label }}</span>

      <span
        class="label"
        v-else-if="!Array.isArray(label)"
        :style="label.style"
        v-tooltip="label.tooltip"
      >
        {{ label.text }}
      </span>

      <template
        v-else-if="label.length > 0"
        v-for="({ text, style, tooltip }, index) of label"
        :key="index"
      >
        <span class="label" :style="style" v-tooltip="tooltip">{{ text }}</span
        ><template v-if="index !== label.length">{{ ' ' }}</template>
      </template>
    </template>
    <brk />
    <ul class="meta" :style="`display: ${state[index] ? 'block' : 'none'}`">
      <li class="inner">
        {{ description || 'no description' }}
      </li>

      <template v-if="link">
        <li class="inner" v-if="typeof link === 'string'">
          <a :href="link">link</a>
        </li>

        <li class="inner" v-else-if="!Array.isArray(link)">
          <a :href="link.href">{{ link.label }}</a>
        </li>

        <li class="inner" v-else-if="link.length > 0">
          links:
          <ul>
            <li v-for="({ label, href }, index) of link" :key="index">
              <a :href="href">{{ label }}</a
              ><template v-if="link.length - 1 !== index">,</template>
            </li>
          </ul>
        </li>
      </template>
    </ul>
    <br />
  </template>
</template>

<style scoped lang="less">
.name {
  color: beige;

  margin-right: 8px;

  &:hover {
    color: blanchedalmond;

    text-decoration: underline;
  }
}

.label {
  color: darkgray;

  font-size: 12px;

  &:before {
    color: darkgray;

    content: '(';
  }

  &:after {
    color: darkgray;

    content: ')';
  }
}
</style>
