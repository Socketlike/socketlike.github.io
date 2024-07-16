<template>
  <div class="highlight">something is wrong.</div>
  <br />
  <div>you tried to access a resource that does not exist.</div>
  <br />
  <div>did you make a typo?</div>
  <br />
  <div style="color: gray">&gt; could not resolve "{{ window.location.pathname }}"</div>
</template>

<style scoped lang="less">
.highlight {
  color: antiquewhite;

  font-weight: 800;
}

* {
  color: darkgray;
}
</style>
