<script setup>
import CrudPage from '../components/CrudPage.vue'

const campos = [
  { chave: 'nome', rotulo: 'Nome' },
  { chave: 'inicio', rotulo: 'Início', tipo: 'date' },
  { chave: 'fim', rotulo: 'Fim', tipo: 'date' },
  { chave: 'visibilidade', rotulo: 'Visibilidade', tipo: 'select', padrao: 'publico',
    opcoes: [{ valor: 'publico', rotulo: 'Público' }, { valor: 'privado', rotulo: 'Privado' }] },
]
const br = (d) => (d ? d.split('-').reverse().join('/') : '')
const colunas = [
  { chave: 'nome' },
  { chave: 'periodo', fmt: (i) => (i.inicio ? `${br(i.inicio)} a ${br(i.fim)}` : '') },
  { chave: 'visibilidade', fmt: (i) => (i.visibilidade === 'publico' ? 'Público' : 'Privado') },
]
</script>

<template><CrudPage titulo="Campeonatos" singular="campeonato" endpoint="/campeonatos" :campos="campos" :colunas="colunas" /></template>
