<script setup lang="ts">
import { RouterView } from 'vue-router'
import RouterLink from '@/components/RouterLink.vue'
import { hidden as hiddenRoutes } from '@/router/routes'
</script>

<template>
  <div class="header">
    <section-block className="text important">
      <span class="content">evie's pages</span>
    </section-block>

    <section-block className="pages">
      <router-link
        v-for="route in $router.getRoutes().filter(({ path }) => !hiddenRoutes.includes(path))"
        v-tooltip="route.path === $route.path ? `you're here` : undefined"
        activeClass="active"
        :key="route.path"
        :to="route.path"
        >{{ route.name }}</router-link
      >
    </section-block>
  </div>

  <div class="content">
    <section-block className="main" :label="$route.name">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <keep-alive>
            <suspense>
              <component :is="Component" />

              <template #fallback>loading</template>
            </suspense>
          </keep-alive>
        </template>
      </router-view>
    </section-block>
  </div>

  <div class="footer">
    <section-block className="text important">
      <div class="content">made with <span class="c-red-f">love &lt;3</span> by evie</div>
    </section-block>
    <section-block className="links">
      <div class="content">
        <a href="https://github.com/Socketlike/socketlike.github.io">github</a>
      </div>
    </section-block>
  </div>
</template>

<style scoped lang="less">
#app {
  > .header {
    display: flex;
    max-width: 100%;
    gap: 6px;

    > .text {
      flex-grow: 1;
      user-select: none;

      > .content {
        font-weight: bold;
        user-select: text;
      }
    }

    > .pages {
      align-items: flex-start;
      display: flex;
      gap: 6px;
      user-select: none;
    }
  }

  > .content {
    display: flex;
    flex-grow: 1;
    overflow: hidden;
    padding-bottom: 6px;

    a {
      overflow-wrap: anywhere;
    }

    > .main {
      flex-grow: 1;
      overflow: scroll;
      box-shadow: none;
    }
  }

  > .footer {
    display: flex;
    max-width: 100%;
    gap: 6px;

    > .text {
      flex-grow: 1;
    }

    > .links {
      align-items: flex-start;
      display: flex;
      gap: 6px;
      user-select: none;
    }
  }
}

@media screen and (max-width: 767px) {
  #app > .header > .pages {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}
</style>
