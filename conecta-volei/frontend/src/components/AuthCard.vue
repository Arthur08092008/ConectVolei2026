<script setup>
defineProps({ titulo: String, subtitulo: String, tagline: String, largo: Boolean })
</script>

<template>
  <div class="aw">
    <div class="auth" :class="{ largo }">
      <div class="logo">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1f3f66" stroke-width="1.8" stroke-linecap="round">
          <circle cx="12" cy="12" r="9.5" />
          <path d="M12 2.5c0 5 2 8 9 9.5M2.6 9c5 0 8 1.5 10 4.5M7 20.5c0-5 1.5-8 5.5-9.5M16.5 20.5c-1-4-3-6.5-6-8" />
        </svg>
      </div>
      <h1 class="marca">Conecta <span>Vôlei</span></h1>
      <p class="sub">{{ tagline }}</p>
      <h2 style="font-size: 24px; margin-bottom: 4px">{{ titulo }}</h2>
      <p class="mu" style="margin: 0 0 8px">{{ subtitulo }}</p>
      <slot />
    </div>
  </div>
</template>
