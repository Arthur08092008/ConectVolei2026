<script setup>
import CrudPage from '../components/CrudPage.vue'

const campos = [
  { chave: 'time_a_id', rotulo: 'Time A', tipo: 'select', fonte: 'times' },
  { chave: 'time_b_id', rotulo: 'Time B', tipo: 'select', fonte: 'times' },
  { chave: 'data_jogo', rotulo: 'Data', tipo: 'date' },
  { chave: 'hora', rotulo: 'Hora', tipo: 'time' },
  { chave: 'local', rotulo: 'Local' },
  { chave: 'campeonato_id', rotulo: 'Campeonato', tipo: 'select', fonte: 'campeonatos' },
  { chave: 'placar_a', rotulo: 'Sets Time A', tipo: 'number' },
  { chave: 'placar_b', rotulo: 'Sets Time B', tipo: 'number' },
]
const colunas = [
  { chave: 'jogo', fmt: (i) => `${i.time_a_nome} x ${i.time_b_nome}` },
  { chave: 'data_jogo', fmt: (i) => i.data_jogo.split('-').reverse().join('/') + (i.hora ? ' ' + i.hora : '') },
  { chave: 'local' },
  { chave: 'placar', fmt: (i) => (i.placar_a != null && i.placar_b != null ? `${i.placar_a} x ${i.placar_b}` : '') },
  { chave: 'campeonato_nome' },
]
</script>

<template><CrudPage titulo="Partidas" singular="partida" endpoint="/partidas" :campos="campos" :colunas="colunas" /></template>
