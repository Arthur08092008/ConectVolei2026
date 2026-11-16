<script setup>
import CrudPage from '../components/CrudPage.vue'

const campos = [
  { chave: 'nome', rotulo: 'Nome do time' },
  { chave: 'categoria', rotulo: 'Categoria' },
  { chave: 'tecnico', rotulo: 'Técnico' },
]
const colunas = [{ chave: 'nome' }, { chave: 'categoria' }, { chave: 'tecnico' }]
</script>

<template><CrudPage titulo="Times" singular="time" endpoint="/times" :campos="campos" :colunas="colunas" /></template>
