import { ref, toValue, watchEffect, type Ref, onUnmounted } from 'vue'

export const useFetch = <JSONType = unknown>(
  url: Ref<string | URL> | string | URL,
  init?: Ref<RequestInit> | RequestInit,
): {
  response: Ref<Response | undefined>
  text: Ref<string | undefined>
  json: Ref<JSONType | undefined>
  error: Ref<Error | undefined>
} => {
  const response: Ref<Response | undefined> = ref()
  const text: Ref<string | undefined> = ref()
  const json: Ref<JSONType | undefined> = ref()
  const error: Ref<Error | undefined> = ref()
  const abortController: Ref<AbortController | undefined> = ref()

  watchEffect(() => {
    abortController.value = new AbortController()

    fetch(toValue(url), { ...toValue(init), signal: abortController.value.signal })
      .then(async (res) => {
        response.value = res
        text.value = await res
          .clone()
          .text()
          .catch(() => undefined)
        json.value = await res
          .clone()
          .json()
          .catch(() => undefined)
      })
      .catch((e) => {
        error.value = e
      })
  })

  onUnmounted(() => {
    abortController.value?.abort?.()
  })

  return { response, text, json, error }
}
