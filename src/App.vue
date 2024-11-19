<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute, type RouteRecordRaw } from 'vue-router'

import AlertRhombusFill from '@pictogrammers/memory-svg/svg/alert-rhombus-fill.svg'

/*
const breadcrumbs = ref<HTMLDivElement | null>(null)
const breadcrumbsWrapper = ref<HTMLDivElement | null>(null)
*/

const main = ref<HTMLDivElement | null>(null)
const mainWrapper = ref<HTMLDivElement | null>(null)

const router = useRouter()
const currentRoute = useRoute()

/*

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

*/

const filter = (route: RouteRecordRaw): boolean =>
  !route.meta?.hidden && !route.meta?.childOf && route.name !== currentRoute.name

const navList = ref(router.options.routes.filter(filter))

const breadcrumbs = computed(() => {
  if (!currentRoute) return []

  const res = [currentRoute.name] as string[]

  let parentGetter = currentRoute.meta.childOf

  while (typeof parentGetter === 'function') {
    const parent = parentGetter()

    res.unshift(parent.name)

    parentGetter = parent.meta?.childOf
  }

  return res
})

const overrideBreadcrumbs = ref('')

router.afterEach(() => {
  navList.value = router.options.routes.filter(filter)
  overrideBreadcrumbs.value = ''
})
</script>

<template>
  <div class="wrapper-header">
    <div class="header">evie's pages</div>

    <div class="nav">
      <router-link v-for="route in navList" :key="route.path" :to="route">
        [{{ route.name }}]
      </router-link>
    </div>
  </div>

  <content-section v-if="currentRoute.name === 'home'" collapsible type="important">
    <template #header>
      <AlertRhombusFill class="inline" style="width: 1.25em" /> important
    </template>

    due to problems with my laptop (which was the only computer i had),
    <brk :for="2" />
    i will no longer be able to maintain any of my projects for an indefinite period.
  </content-section>

  <content-section ref="mainWrapper" class="wrapper-main">
    <template #header>
      <span
        v-for="name in !overrideBreadcrumbs ? breadcrumbs : overrideBreadcrumbs.split(',')"
        :key="name"
        class="breadcrumb"
      >
        {{ name }}
      </span>
    </template>

    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <suspense>
          <component
            :is="Component"
            @override-breadcrumbs="
              (breadcrumbs: unknown) => (overrideBreadcrumbs = String(breadcrumbs))
            "
          />

          <template #fallback> loading... </template>
        </suspense>
      </template>
    </router-view>
  </content-section>

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
