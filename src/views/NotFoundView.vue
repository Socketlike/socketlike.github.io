<template>
  <div>
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
