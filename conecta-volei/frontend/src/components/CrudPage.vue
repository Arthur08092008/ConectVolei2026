<script setup>
import { ref, reactive, onMounted } from 'vue'
import api, { mensagemErro } from '../services/api'

/*
 props.campos:  [{ chave, rotulo, tipo: 'text'|'number'|'date'|'time'|'select', opcoes?, fonte?, padrao? }]
 props.colunas: [{ chave, rotulo, fmt?: (item) => string }]
*/
const props = defineProps({
  titulo: String, singular: String, endpoint: String,
  campos: Array, colunas: Array, checklist: Boolean,
})

const itens = ref([])
const fontes = reactive({})
const erro = ref('')
const editando = ref(null)
const vazio = () => Object.fromEntries(props.campos.map((c) => [c.chave, c.padrao ?? '']))
const form = ref(vazio())

async function carregar() {
  try {
    itens.value = (await api.get(props.endpoint)).data
    for (const c of props.campos) {
      if (c.fonte) {
        const r = (await api.get('/' + c.fonte)).data
        fontes[c.chave] = r.map((x) => ({ valor: x.id, rotulo: x.nome }))
      }
    }
  } catch (e) { erro.value = mensagemErro(e) }
}

async function salvar() {
  erro.value = ''
  try {
    if (editando.value) await api.put(`${props.endpoint}/${editando.value}`, form.value)
    else await api.post(props.endpoint, form.value)
    cancelar()
    await carregar()
  } catch (e) { erro.value = mensagemErro(e) }
}

function editar(item) {
  editando.value = item.id
  form.value = Object.fromEntries(props.campos.map((c) => [c.chave, item[c.chave] ?? '']))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function cancelar() { editando.value = null; form.value = vazio() }

async function excluir(item) {
  if (!confirm('Deseja excluir este registro?')) return
  try { await api.delete(`${props.endpoint}/${item.id}`); await carregar() }
  catch (e) { erro.value = mensagemErro(e) }
}

async function alternar(item) {
  try { await api.put(`${props.endpoint}/${item.id}`, { item: item.item, concluido: !item.concluido }); await carregar() }
  catch (e) { erro.value = mensagemErro(e) }
}

onMounted(carregar)
</script>

<template>
  <h1>{{ titulo }}</h1>

  <form class="card" @submit.prevent="salvar">
    <h2 style="font-size: 18px">{{ editando ? 'Editar' : 'Cadastrar' }} {{ singular }}</h2>
    <div class="grade">
      <label v-for="c in campos" :key="c.chave">
        {{ c.rotulo }}
        <select v-if="c.tipo === 'select'" v-model="form[c.chave]">
          <option value="">Selecione</option>
          <option v-for="o in c.opcoes || fontes[c.chave] || []" :key="o.valor" :value="o.valor">{{ o.rotulo }}</option>
        </select>
        <input v-else v-model="form[c.chave]" :type="c.tipo || 'text'" />
      </label>
    </div>
    <p v-if="erro" class="caixa-erro">{{ erro }}</p>
    <div class="acoes">
      <button type="submit">Salvar</button>
      <button v-if="editando" type="button" class="sec" @click="cancelar">Cancelar</button>
    </div>
  </form>

  <div class="card">
    <p v-if="!itens.length" class="mu">Nada cadastrado ainda.</p>
    <div v-for="i in itens" :key="i.id" class="linha">
      <span>
        <input v-if="checklist" type="checkbox" style="width: auto; margin-right: 8px" :checked="i.concluido" @change="alternar(i)" />
        <template v-for="(c, idx) in colunas" :key="c.chave">
          <b v-if="idx === 0" :style="i.concluido ? 'text-decoration: line-through' : ''">{{ c.fmt ? c.fmt(i) : i[c.chave] }}</b>
          <span v-else-if="c.fmt ? c.fmt(i) : i[c.chave]" class="mu"> · {{ c.fmt ? c.fmt(i) : i[c.chave] }}</span>
        </template>
      </span>
      <span v-if="i.meu !== false" style="display: flex; gap: 6px">
        <button type="button" class="sec" style="width: auto; padding: 6px 12px" @click="editar(i)">Editar</button>
        <button type="button" class="del" @click="excluir(i)">Excluir</button>
      </span>
    </div>
  </div>
</template>
