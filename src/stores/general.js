import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const NAME_LANGUAGE_UA = 'ua'
const NAME_LANGUAGE_RU = 'ru'

export const useGeneralStore = defineStore('general', () => {
  const count = ref(0)
  const locale = ref(NAME_LANGUAGE_UA)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
