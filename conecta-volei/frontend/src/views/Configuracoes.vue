<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api, { TOKEN_KEY, mensagemErro } from '../services/api'

const router = useRouter()
const perfil = ref({})
const erro = ref('')

onMounted(async () => {
  try { perfil.value = (await api.get('/auth/perfil')).data }
  catch (e) { erro.value = mensagemErro(e) }
})

function sair() {
  localStorage.removeItem(TOKEN_KEY)
  router.push('/')
}
</script>

<template>
  <h1>Configurações</h1>
  <p v-if="erro" class="caixa-erro">{{ erro }}</p>
  <div class="card">
    <h2 style="font-size: 18px">Minha conta</h2>
    <p><b>{{ perfil.nome }}</b></p>
    <p class="mu">{{ perfil.email }}<br />{{ perfil.telefone || 'Telefone não informado' }}</p>
    <button class="del" style="margin-top: 8px" @click="sair">Sair da conta</button>
  </div>
</template>
