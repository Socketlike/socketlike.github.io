<template>
  welcome to my github pages
  <brk :for="3" />
  sorry i don't have much to say;
  <brk :for="3" />
  even about myself or anything about this site in particular
  <brk :for="2" />
  because it is nothing interesting
  <brk :for="6" />
  this site has had 3 iterations so far;
  <brk :for="2" />
  you are currently looking at the third iteration of this site; which is written in
  <a href="//v3.vuejs.org">[vue 3]</a>
  <brk :for="3" />
  as for the previous two iterations:
  <ul style="list-style-type: '- '">
    <li>
      <a href="//github.com/Socketlike/socketlike.github.io/tree/c01f306114b7b3e6de751b94f5e6afd83183a529/src"
        v-tooltip="'(last commit: c01f306)'">[the first iteration]</a>
      was written in <a href="//react.dev">[react]</a>; which, probably, had some serious
      performance issues
    </li>
    <li>
      <a href="//github.com/Socketlike/socketlike.github.io/tree/6b29b402b4af63e86ddf77d36794c76f316e0a99/src">[the
        second iteration]</a>
      was written in vue 3 and was tailored to look and feel the same as
      <span class="note" v-tooltip="'which was composed of mostly jank'">[the first iteration]</span>; which, probably,
      caused it to have a lot of janky wiring
    </li>
  </ul>
  <brk />
  feel free to look and poke around with anything you see on this site!
  <brk :for="2" />
  <div style="color: gray; font-size: 2px">window.__internals__</div>
</template>
