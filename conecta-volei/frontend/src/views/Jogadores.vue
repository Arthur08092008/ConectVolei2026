<script setup>
import CrudPage from '../components/CrudPage.vue'

const campos = [
  { chave: 'nome', rotulo: 'Nome' },
  { chave: 'posicao', rotulo: 'Posição', tipo: 'select', opcoes: ['Levantador', 'Oposto', 'Ponteiro', 'Central', 'Líbero'].map((p) => ({ valor: p, rotulo: p })) },
  { chave: 'camisa', rotulo: 'Nº da camisa', tipo: 'number' },
  { chave: 'time_id', rotulo: 'Time', tipo: 'select', fonte: 'times' },
]
const colunas = [
  { chave: 'nome' }, { chave: 'posicao' },
  { chave: 'camisa', fmt: (i) => (i.camisa != null ? `Nº ${i.camisa}` : '') },
  { chave: 'time_nome' },
]
</script>

<template><CrudPage titulo="Jogadores" singular="jogador" endpoint="/jogadores" :campos="campos" :colunas="colunas" /></template>
