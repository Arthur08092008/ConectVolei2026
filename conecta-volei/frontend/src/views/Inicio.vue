<script setup>
import { ref, computed, onMounted } from 'vue'
import api, { mensagemErro } from '../services/api'

const nome = ref('')
const dados = ref({ jogadores: [], times: [], partidas: [], campeonatos: [] })
const erro = ref('')

onMounted(async () => {
  try {
    const [perfil, ...r] = await Promise.all([
      api.get('/auth/perfil'), api.get('/jogadores'), api.get('/times'), api.get('/partidas'), api.get('/campeonatos'),
    ])
    nome.value = perfil.data.nome.split(' ')[0]
    dados.value = { jogadores: r[0].data, times: r[1].data, partidas: r[2].data, campeonatos: r[3].data }
  } catch (e) { erro.value = mensagemErro(e) }
})

const hojeISO = new Date().toISOString().slice(0, 10)
const proximas = computed(() => dados.value.partidas.filter((p) => p.data_jogo >= hojeISO).slice(0, 5))
const br = (d) => d.split('-').reverse().join('/')
</script>

<template>
  <h1>Olá, {{ nome }}!</h1>
  <p v-if="erro" class="caixa-erro">{{ erro }}</p>
  <div class="grade" style="margin-bottom: 16px">
    <div v-for="k in ['jogadores', 'times', 'partidas', 'campeonatos']" :key="k" class="card" style="margin: 0">
      <div class="mu" style="text-transform: capitalize">{{ k }}</div>
      <h2>{{ dados[k].length }}</h2>
    </div>
  </div>
  <div class="card">
    <h2 style="font-size: 18px">Próximas partidas</h2>
    <p v-if="!proximas.length" class="mu">Sem jogos marcados.</p>
    <div v-for="p in proximas" :key="p.id" class="linha">
      <span>{{ p.time_a_nome }} x {{ p.time_b_nome }}</span>
      <span class="mu">{{ br(p.data_jogo) }} {{ p.hora }}</span>
    </div>
  </div>
</template>
