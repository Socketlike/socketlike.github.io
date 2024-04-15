<script setup lang="ts">
import { reactive, ref } from 'vue'

const buttonClicked = ref(false)
const rangeValue = ref(0)
const submitMessages = reactive([
  'nope!',
  'did you want to send these random pieces of data? oh, whoops, i dropped it!',
  'are you serious?',
  'you tried',
  "you didn't think that would work, did you?",
  '(pfft) no way.',
  "if you're seeing this multiple times then your RNG must be very bad",
  'it worked, alright.',
  'i lied.',
  '"like, have you seen this person? they just tried to send us data from a static SPA! (laughter)"',
  'hey, it says "gullible" on the ceiling! (very audible laughter)',
  "all of your [personal data] has been sent to yours truly.\ndid you not meant to do that?\nah, well, it's too late.",
  'have you seen all of these messages yet? there are 13 unique ones!',
])

function onSubmit(event: Event) {
  event.preventDefault()
  event.stopPropagation()

  alert(submitMessages[Math.round(Math.random() * (submitMessages.length - 1))])
}
</script>

<template>
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
    <span v-tooltip="'test'">tooltipped text</span>
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

  <section-block label="form items">
    <form @submit="onSubmit">
      <div>
        <span>range: </span
        ><input v-tooltip="`${rangeValue}%`" type="range" min="0" max="100" v-model="rangeValue" />
      </div>
      <br />
      <div><span>text: </span><input type="text" /></div>
      <br />
      <div>
        <span>select: </span
        ><select>
          <option value="">&lt;no option&gt;</option>
          <option value="1">this</option>
          <option value="2">is</option>
          <option value="3">an</option>
          <option value="4">option</option>
        </select>
      </div>
      <br />
      <div>
        <span>button: </span
        ><button
          type="button"
          @click="
            () => {
              buttonClicked = !buttonClicked
            }
          "
        >
          button ({{ buttonClicked }})
        </button>
      </div>
      <br />
      <button type="submit">submit data</button>
    </form>
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
