<script setup lang="ts">
import { RouterView } from 'vue-router'
import RouterLink from '@/components/RouterLink.vue'
import { hidden as hiddenRoutes } from '@/router/routes'
</script>

<template>
  <div class="header">
    <section-block className="text" label="header">
      <span class="content">evie's pages</span>
    </section-block>
    <section-block className="pages" label="pages">
      <RouterLink
        v-for="route in $router.getRoutes().filter(({ path }) => !hiddenRoutes.includes(path))"
        activeClass="active"
        :key="route.path"
        :to="route.path"
        >{{ route.name }}</RouterLink
      >
    </section-block>
  </div>

  <div class="content">
    <section-block className="main" label="content">
      <RouterView />
    </section-block>
  </div>

  <div class="footer">
    <section-block className="text" label="footer">
      <div class="content">made with <span class="c-red">love &lt;3</span> by evie</div>
    </section-block>
    <section-block className="links" label="links">
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

    > .text {
      flex-grow: 1;
      user-select: none;

      > .content {
        font-weight: bold;
        user-select: text;
      }

      .splash-text {
        font-weight: normal;
        color: var(--yellow);
        max-width: 100%;
        user-select: none;

        .separator {
          color: var(--gray);
          user-select: none;
        }

        .content {
          font-style: italic;
          user-select: text;
        }
      }
    }

    > .pages {
      display: flex;
      gap: 6px;
      user-select: none;
      align-items: flex-start;
    }
  }

  > .content {
    display: flex;
    flex-grow: 1;

    a {
      overflow-wrap: anywhere;
    }

    > .main {
      flex-grow: 1;
      overflow: scroll;
    }
  }

  > .footer {
    display: flex;
    max-width: 100%;

    > .text {
      flex-grow: 1;
    }

    > .links {
      align-items: flex-start;
      user-select: none;
      display: flex;
      gap: 6px;
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
