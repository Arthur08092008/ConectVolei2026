<script setup>
const links = [
  ['/inicio', 'Início'], ['/jogadores', 'Jogadores'], ['/times', 'Times'], ['/partidas', 'Partidas'],
  ['/campeonatos', 'Campeonatos'], ['/checklist', 'Checklist'], ['/calendario', 'Calendário'],
  ['/configuracoes', 'Configurações'],
]
</script>

<template>
  <nav class="menu">
    <h2>🏐 Conecta</h2>
    <router-link v-for="[to, nome] in links" :key="to" :to="to" active-class="on">{{ nome }}</router-link>
  </nav>
</template>
