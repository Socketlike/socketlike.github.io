<script setup lang="ts"></script>

<template>
  <section-block class="info" label="README" variant="info">
    this site is designed to look like a
    <span data-tooltip="terminal UI">TUI</span> app. <br /><br />
    because of that, the site uses unusual formatting that may confuse you. <br /><br />
    this is an encyclopedia of sorts that includes all of the formatting used in this site.
  </section-block>

  <br />

  <section-block label="font">
    <div>normal font size</div>
    <div class="f-large">large font size</div>
    <div class="f-larger">larger font size</div>
  </section-block>

  <br />

  <section-block label="text">
    <code>
      (code) a quick brown fox
      <br />
      jumps over
      <br />
      the lazy dog
    </code>
    <br />
    <br />
    <span data-tooltip="tooltip content">tooltipped text</span>
  </section-block>

  <br />

  <section-block label="colors">
    <div :style="{ color: 'var(--background)', backgroundColor: 'var(--foreground)' }">
      foreground
    </div>
    <div :style="{ color: 'var(--background)', backgroundColor: 'var(--foreground-focused)' }">
      foreground (focused)
    </div>
    <div :style="{ color: 'var(--background)', backgroundColor: 'var(--foreground-unfocused)' }">
      foreground (unfocused)
    </div>
    <div :style="{ color: 'var(--foreground)', backgroundColor: 'var(--background)' }">
      background
    </div>
    <div :style="{ color: 'var(--background)', backgroundColor: 'var(--foreground)' }">white</div>
    <div :style="{ color: 'var(--background)', backgroundColor: 'var(--red)' }">
      red (urgent / errors)
    </div>
    <div :style="{ color: 'var(--background)', backgroundColor: 'var(--yellow)' }">
      yellow (minor urgent / warnings)
    </div>
    <div :style="{ color: 'var(--background)', backgroundColor: 'var(--green)' }">
      green (success)
    </div>
    <div :style="{ color: 'var(--background)', backgroundColor: 'var(--lightblue)' }">
      light blue (informal / links)
    </div>
    <div :style="{ color: 'var(--background)', backgroundColor: 'var(--gray)' }">gray</div>
  </section-block>

  <br />

  <section-block label="section blocks">
    <section-block label="normal">a quick brown fox jumps over the lazy dog</section-block>
    <br />
    <section-block label="informal" variant="info"
      >a quick brown fox jumps over the lazy dog</section-block
    >
    <br />
    <section-block label="warning" variant="warning"
      >a quick brown fox jumps over the lazy dog</section-block
    >
    <br />
    <section-block label="error" variant="error"
      >a quick brown fox jumps over the lazy dog</section-block
    >
  </section-block>
</template>

<style scoped lang="less"></style>
