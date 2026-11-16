<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api, { TOKEN_KEY, mensagemErro } from '../services/api'
import AuthCard from '../components/AuthCard.vue'
import SenhaInput from '../components/SenhaInput.vue'

const router = useRouter()
const f = reactive({ nome: '', email: '', telefone: '', senha: '', confirmar: '' })
const erro = ref('')
const carregando = ref(false)
const reEmail = /^\S+@\S+\.\S+$/
const reSenha = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])(?=.*[^\w\s]).{8,}$/

async function cadastrar() {
  erro.value = ''
  if (!f.nome.trim()) return (erro.value = 'Informe seu nome completo.')
  if (!reEmail.test(f.email)) return (erro.value = 'Informe um e-mail válido.')
  if (!reSenha.test(f.senha)) return (erro.value = 'A senha precisa ter 8+ caracteres, maiúscula, número e símbolo.')
  if (f.senha !== f.confirmar) return (erro.value = 'As senhas não coincidem.')
  carregando.value = true
  try {
    const { data } = await api.post('/auth/cadastro', {
      nome: f.nome, email: f.email, telefone: f.telefone, senha: f.senha,
    })
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
  <AuthCard largo titulo="Crie sua conta" subtitulo="Preencha os dados para começar a organizar." tagline="Faça parte dessa conexão.">
    <form @submit.prevent="cadastrar">
      <label>Nome completo<input v-model="f.nome" /></label>
      <label>E-mail<input v-model="f.email" type="email" /></label>
      <label>Telefone <span class="mu" style="font-weight: 400">(opcional)</span><input v-model="f.telefone" type="tel" /></label>
      <div class="duas">
        <label>Senha<SenhaInput v-model="f.senha" /></label>
        <label>Confirmar senha<SenhaInput v-model="f.confirmar" /></label>
      </div>
      <p v-if="erro" class="caixa-erro">{{ erro }}</p>
      <button class="principal" :disabled="carregando">{{ carregando ? 'Criando...' : 'Criar minha conta' }}</button>
    </form>
    <div class="centro"><router-link to="/" class="link">Já tem conta? <b>Entrar</b></router-link></div>
  </AuthCard>
</template>
