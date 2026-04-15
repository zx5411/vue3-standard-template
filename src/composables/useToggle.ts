import { ref } from 'vue'

export function useToggle(initialValue = false) {
  const state = ref(initialValue)

  function set(value: boolean) {
    state.value = value
  }

  function open() {
    set(true)
  }

  function close() {
    set(false)
  }

  function toggle() {
    set(!state.value)
  }

  return {
    state,
    set,
    open,
    close,
    toggle,
  }
}
