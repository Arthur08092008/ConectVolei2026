<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api, { TOKEN_KEY, mensagemErro } from '../services/api'
import AuthCard from '../components/AuthCard.vue'
import SenhaInput from '../components/SenhaInput.vue'

const router = useRouter()
const f = reactive({ email: '', senha: '' })
const erro = ref('')
const carregando = ref(false)

async function entrar() {
  erro.value = ''
  if (!f.email || !f.senha) return (erro.value = 'Informe e-mail e senha.')
  carregando.value = true
  try {
    const { data } = await api.post('/auth/login', { email: f.email, senha: f.senha })
    localStorage.setItem(TOKEN_KEY, data.token)
    router.push('/inicio')
  } catch (e) {
    erro.value = mensagemErro(e)
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <AuthCard titulo="Bem-vindo de volta!" subtitulo="Entre na sua conta para continuar." tagline="Seu esporte, mais conectado.">
    <form @submit.prevent="entrar">
      <label>E-mail<input v-model="f.email" type="email" placeholder="seu@email.com" /></label>
      <label>Senha<SenhaInput v-model="f.senha" placeholder="Digite sua senha" /></label>
      <router-link to="/esqueci-senha" class="link">Esqueci minha senha</router-link>
      <p v-if="erro" class="caixa-erro">{{ erro }}</p>
      <button class="principal" :disabled="carregando">{{ carregando ? 'Entrando...' : 'Entrar na plataforma' }}</button>
    </form>
    <div class="centro"><router-link to="/cadastro" class="link">Ainda não tem uma conta? <b>Criar cadastro</b></router-link></div>
  </AuthCard>
</template>
