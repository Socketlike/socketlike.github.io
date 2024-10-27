<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const breadcrumbs = ref<HTMLDivElement | null>(null)
const breadcrumbsWrapper = ref<HTMLDivElement | null>(null)

const main = ref<HTMLDivElement | null>(null)
const mainWrapper = ref<HTMLDivElement | null>(null)

const navOpen = ref(false)

const router = useRouter()
const currentRoute = useRoute()

const scrollHandler = (
  target: HTMLDivElement,
  wrapper: HTMLDivElement,
  horizontal?: boolean,
): void => {
  if (horizontal) {
    if (target.scrollLeft > 0) wrapper.classList.add('left-scrollable')
    else wrapper.classList.remove('left-scrollable')

    if (Math.ceil(target.scrollLeft) < target.scrollWidth - target.offsetWidth)
      wrapper.classList.add('right-scrollable')
    else wrapper.classList.remove('right-scrollable')
  } else {
    if (target.scrollTop > 0) wrapper.classList.add('top-scrollable')
    else wrapper.classList.remove('top-scrollable')

    if (Math.ceil(target.scrollTop) < target.scrollWidth - target.offsetWidth)
      wrapper.classList.add('bottom-scrollable')
    else wrapper.classList.remove('bottom-scrollable')
  }
}

const breadcrumbsScrollHandler = ({ target }: Event): void =>
  scrollHandler(target as HTMLDivElement, breadcrumbsWrapper.value!, true)

onMounted((): void => {
  queueMicrotask(() => breadcrumbsScrollHandler({ target: breadcrumbs.value! } as unknown as Event))
})

watch(currentRoute, (): void => {
  queueMicrotask(() => breadcrumbsScrollHandler({ target: breadcrumbs.value! } as unknown as Event))
})
</script>

<template>
  <div class="wrapper-header">
    <div class="header">evie's pages</div>
    <!--    <v-tooltip class="menu" :triggers="['click']">
      <div class="label">
        menu
      </div>

      <template #popper>
        <router-link v-for="route in router
          .getRoutes()
          .filter(
            (route) => !route.meta.hidden && !route.meta.child && route.name !== currentRoute.name,
          )" :key="route.path" :to="{ name: route.name }">
          [{{ route.name }}]
        </router-link>

      </template>
</v-tooltip> -->
    <div @click='navOpen = !navOpen' :class="`nav-button ${navOpen ? 'open' : ''}`">
      nav <{{ navOpen ? 'close' : 'open' }}>
    </div>

    <div :class="`nav ${navOpen ? 'open' : ''}`">
      <router-link v-for="route in router
        .getRoutes()
        .filter(
          (route) => !route.meta.hidden && !route.meta.child && route.name !== currentRoute.name,
        )" :key="route.path" :to="{ name: route.name }">
        [{{ route.name }}]
      </router-link>
    </div>
  </div>

  <div class="section" v-if="currentRoute.name === 'home'">
    <div class="header">important</div>

    <div class="wrapper">
      due to problems with my laptop (which is the only computer i possess),
      <brk :for="2" />
      i will no longer be able to maintain any of my projects for an indefinite period.
    </div>
  </div>

  <div class="breadcrumbs-wrapper" ref="breadcrumbsWrapper">
    <div class="left-overlay" />
    <div class="right-overlay" />

    <div class="breadcrumbs" ref="breadcrumbs" @scroll="breadcrumbsScrollHandler">
      <span v-for="{ name } in currentRoute.matched" class="breadcrumb" :key="name">
        {{ name }}
      </span>
    </div>
  </div>

  <div class="wrapper-main" ref="mainWrapper">
    <main ref="main">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <suspense>
            <component :is="Component" />

            <template #fallback>loading</template>
          </suspense>
        </template>
      </router-view>
    </main>
  </div>

  <div class="wrapper-footer">
    <div class="nav">
      <a href="//github.com/Socketlike/socketlike.github.io">[github]</a>
    </div>
    <div class="footer">
      made with <span style="color: crimson">{{ 'love <3' }}</span> by
          <span style="color: beige">evie</span>
    </div>
  </div>
</template>
