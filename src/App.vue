<script setup lang="ts">
import { filter } from '@/router'
</script>

<template>
  <div class="wrapper">
    <div class="header">
      evie's pages
      <span class="breadcrumb">{{ $route.name }}</span>
    </div>
    <div class="nav">
      <router-link
        v-for="route in $router
          .getRoutes()
          .filter(filter)
          .filter((route) => route.name !== $route.name)"
        :key="route.path"
        :to="{ name: route.name }"
      >
        [{{ route.name }}]
      </router-link>
    </div>
  </div>

  <main>
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <suspense>
          <component :is="Component" />

          <template #fallback>loading</template>
        </suspense>
      </template>
    </router-view>
  </main>

  <div class="wrapper no-wrap">
    <div class="nav">
      <a href="//github.com/Socketlike/socketlike.github.io">[github]</a>
    </div>
    <div class="footer">
      made with <span style="color: crimson">{{ 'love <3' }}</span> by
      <span style="color: beige">evie</span>
    </div>
  </div>
</template>
