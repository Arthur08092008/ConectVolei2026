<script setup>
import CrudPage from '../components/CrudPage.vue'

const campos = [{ chave: 'item', rotulo: 'Item (ex: Bolas, Rede, Súmula, Árbitro)' }]
const colunas = [{ chave: 'item' }]
</script>

<template><CrudPage titulo="Checklist" singular="item" endpoint="/checklist" :campos="campos" :colunas="colunas" checklist /></template>
