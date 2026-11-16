<script setup>
import { ref } from 'vue'
defineProps({ modelValue: String, placeholder: String })
defineEmits(['update:modelValue'])
const ver = ref(false)
</script>

<template>
  <div class="pwb">
    <input :type="ver ? 'text' : 'password'" :value="modelValue" :placeholder="placeholder"
           @input="$emit('update:modelValue', $event.target.value)" />
    <button type="button" class="eye" aria-label="Mostrar ou ocultar senha" @click="ver = !ver">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />
      </svg>
    </button>
  </div>
</template>
