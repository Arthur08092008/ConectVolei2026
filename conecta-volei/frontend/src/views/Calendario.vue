<script setup>
import { ref, computed, onMounted } from 'vue'
import api, { mensagemErro } from '../services/api'

const partidas = ref([])
const erro = ref('')
const hoje = new Date()
const mes = ref(new Date(hoje.getFullYear(), hoje.getMonth(), 1))
const pad = (n) => String(n).padStart(2, '0')

onMounted(async () => {
  try { partidas.value = (await api.get('/partidas')).data }
  catch (e) { erro.value = mensagemErro(e) }
})

const titulo = computed(() => mes.value.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }))

const dias = computed(() => {
  const y = mes.value.getFullYear(), m = mes.value.getMonth()
  const lista = Array(new Date(y, m, 1).getDay()).fill(null)
  for (let d = 1; d <= new Date(y, m + 1, 0).getDate(); d++) {
    const chave = `${y}-${pad(m + 1)}-${pad(d)}`
    lista.push({ d, jogos: partidas.value.filter((p) => p.data_jogo === chave) })
  }
  return lista
})

const mover = (n) => (mes.value = new Date(mes.value.getFullYear(), mes.value.getMonth() + n, 1))
</script>

<template>
  <h1>Calendário de jogos</h1>
  <p v-if="erro" class="caixa-erro">{{ erro }}</p>
  <div class="card">
    <div class="topo-cal">
      <button class="sec" @click="mover(-1)">‹</button>
      <b style="text-transform: capitalize">{{ titulo }}</b>
      <button class="sec" @click="mover(1)">›</button>
    </div>
    <div class="cal">
      <div v-for="(s, i) in ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']" :key="i" class="cab">{{ s }}</div>
      <template v-for="(dia, i) in dias" :key="i">
        <div v-if="!dia" class="vazio"></div>
        <div v-else>
          <b>{{ dia.d }}</b>
          <span v-for="p in dia.jogos" :key="p.id" class="jogo" :title="p.local">{{ p.hora }} {{ p.time_a_nome }} x {{ p.time_b_nome }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
