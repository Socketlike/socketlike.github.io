<script setup lang="ts">
import { ref } from 'vue'
import localStorage from '@/util/localStorage'

const limboTriggered = ref(localStorage.getItem('limbo') !== null)
const shouldTriggerLimbo = ref(Math.random() <= 0.2)

if (!limboTriggered.value && shouldTriggerLimbo.value) localStorage.setItem('limbo', '')
</script>

<template>
  <div v-if="!limboTriggered && shouldTriggerLimbo">
    <div>uh oh. how did you get here?</div>
    <br />
    <div>
      oh, right! you
      <span class="c-yellow-f italic">tried to go somewhere that probably didn't exist</span>.
    </div>
    <br />
    <div>hello? are you still here?</div>
    <div :style="{ height: '30em' }" />
    <div>oh, you're still here!</div>
    <br />
    <br />
    <div>i'm sorry, pinpointing people's location in, er, uhm...</div>
    <br />
    <div>does this place even have a name?</div>
    <div :style="{ height: '5em' }" />
    <div>ugh, god.</div>
    <br />
    <br />
    <div>
      okay, for the sake of simplicity, let's just call this place "<span class="c-red-f"
        >Limbo</span
      >".
    </div>
    <br />
    <div>"<span class="c-red-f">Limbo</span>", you see, is not a very friendly place to be.</div>
    <br />
    <div>uhm, er, i don't want to scare you, but-</div>
    <br />
    <br />
    <div class="c-fg italic">(sigh)</div>
    <div :style="{ height: '10em' }" />
    <br />
    <div>those who went in it <span class="c-red-f italic">never returned</span>.</div>
    <br />
    <br />
    <div>so, um, i'm afraid that you might be stuck in there forever.</div>
    <br />
    <br />
    <div>but, this is an unprecedented case! you still have your connection to me!</div>
    <br />
    <div>maybe you can still go-</div>
    <br />
    <div class="c-fg italic">(beep, beep, beep)</div>
    <div :style="{ height: '20em' }" />
    <div class="c-fg italic">[what just happened?]</div>
    <div :style="{ height: '20em' }" />
    <div class="c-fg italic">[what the <span class="bold">fuck</span> just happened?]</div>
    <div :style="{ height: '10em' }" />
    <div class="c-fg italic">(the silence grows.)</div>
    <div :style="{ height: '10em' }" />
    <div class="c-fg italic">(you're all alone.)</div>
    <div :style="{ height: '10em' }" />
    <div class="c-fg italic">[how did this happen?]</div>
    <div :style="{ height: '5em' }" />
    <div class="c-fg italic">(there was no answer.)</div>
    <div :style="{ height: '10em' }" />
    <div class="c-fg italic">[why did this happen?]</div>
    <div :style="{ height: '5em' }" />
    <div class="c-fg italic">(there was no answer.)</div>
    <div :style="{ height: '20em' }" />
    <div class="c-fg italic">[why did it have to be <span class="c-fg bold italic">ME</span>?]</div>
    <div :style="{ height: '5em' }" />
    <div class="c-fg italic">(there was no answer.)</div>
    <div :style="{ height: '16em' }" />
    <div class="c-fg italic">(the silence grows stronger.)</div>
    <br />
    <div class="c-fg italic">[this has to be a joke.]</div>
    <br />
    <div class="c-fg italic">[that's right, a <span class="c-red">sick joke</span>.]</div>
    <br />
    <div class="c-fg italic">(you tried to shout as hard as you could.)</div>
    <br />
    <br />
    <br />
    <div class="c-fg italic">(you did not make a sound.)</div>
    <br />
    <div class="c-fg italic">[what the hell?]</div>
    <br />
    <div class="c-fg italic">(you stomp the ground with your bare foot. there was no sound.)</div>
    <div :style="{ height: '5em' }" />
    <div class="c-fg italic">[<span class="bold">what the hell?</span>]</div>
    <div :style="{ height: '20em' }" />
    <div class="c-fg italic">(you feel overwhelmed.)</div>
    <div :style="{ height: '10em' }" />
    <div class="c-fg italic">
      (you look around to find something, <span class="bold">anything</span>, to distract yourself.)
    </div>
    <br />
    <div class="c-fg italic">
      (as you looked around, you realized: there's no floor, no ceiling, no lights (but still pretty
      bright), no nothing.)
    </div>
    <br />
    <div class="c-fg italic">(you're just floating in the middle of nowhere.)</div>
    <br />
    <div class="c-fg italic">[well, that surely can't be good.]</div>
    <div :style="{ height: '5em' }" />
    <div class="c-fg italic">(you hear a sound. for the first time in quite a while.)</div>
    <br />
    <div class="c-fg italic">(you look around.)</div>
    <br />
    <div class="c-fg italic">[okay, what now!?]</div>
    <br />
    <div class="c-fg italic">(something is approaching. and fast.)</div>
    <br />
    <div class="c-fg italic">
      (before you even had a chance to figure out what it is, how to deal with it, your vision went
      completely blank.)
    </div>
    <div :style="{ height: '30em' }" />
    <div class="c-fg italic">(a familiar sound fills your ear.)</div>
    <br />
    <div>oh, god, are you okay?</div>
    <br />
    <div>you were sitting doing completely nothing for a whole 10 minutes!</div>
    <br />
    <div class="c-fg">oh, i'm sorry.</div>
    <br />
    <div class="c-fg italic">
      (you
      <a
        @click="
          (event) => {
            event.stopPropagation()
            event.preventDefault()

            $router.back()
          }
        "
        >continued what you were doing before</a
      >.)
    </div>
    <br />
    <div class="c-fg italic">
      (needless to say, you didn't remember one bit, about your experience in the supposed "<span
        class="c-red"
        >Limbo</span
      >".)
    </div>
    <br />
    <div class="c-fg italic">(you tried to remember, but you couldn't.)</div>
    <br />
    <div class="c-fg italic">(you shrugged it off.)</div>
    <br />
    <div class="c-red-f f-large">404, not found.</div>
    <br />
    <div class="c-red-f">be much more careful next time.</div>
    <br />
    <div class="c-fg italic">
      (there was no destination for "<span class="bold">{{ $route.path }}</span
      >". it's a shame.)
    </div>
  </div>

  <div v-else>
    <div class="c-red-f f-large">404, not found.</div>
    <br />
    <div>
      there was no destination for "<span class="bold">{{ $route.path }}</span
      >". was it a typo?
    </div>
    <br />
    <div>
      ah, well, who cares. just
      <a
        @click="
          (event) => {
            event.stopPropagation()
            event.preventDefault()

            $router.back()
          }
        "
        >go back</a
      >.
    </div>
  </div>
</template>
