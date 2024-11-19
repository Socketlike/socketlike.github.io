<script setup lang="ts">
import { reactive } from 'vue'

import list from './list'

const state = reactive([] as boolean[])
</script>

<template>
  <template v-for="({ name, description, link, label }, index) of list" :key="index">
    <span class="name" @click="() => (state[index] = !state[index])">[{{ name }}]</span>
    <template v-if="label">
      <span v-if="typeof label === 'string'" class="label">{{ label }}</span>

      <span
        v-else-if="!Array.isArray(label)"
        v-tooltip="label.tooltip"
        class="label"
        :style="label.style"
      >
        {{ label.text }}
      </span>

      <template
        v-for="({ text, style, tooltip }, index) of label"
        v-else-if="label.length > 0"
        :key="index"
      >
        <span v-tooltip="tooltip" class="label" :style="style">{{ text }}</span
        ><template v-if="index !== label.length">{{ ' ' }}</template>
      </template>
    </template>
    <brk />
    <ul class="meta" :style="`display: ${state[index] ? 'block' : 'none'}`">
      <li class="inner">
        {{ description || 'no description' }}
      </li>

      <template v-if="link">
        <li v-if="typeof link === 'string'" class="inner">
          <a :href="link">link</a>
        </li>

        <li v-else-if="!Array.isArray(link)" class="inner">
          <a :href="link.href">{{ link.label }}</a>
        </li>

        <li v-else-if="link.length > 0" class="inner">
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
