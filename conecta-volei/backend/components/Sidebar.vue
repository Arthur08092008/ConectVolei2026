<script setup>
import { h } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const TOKEN_KEY = 'voleitcc_token'
const logoUrl = new URL('../assets/logo.jpeg', import.meta.url).href

function sair() {
  localStorage.removeItem(TOKEN_KEY)
  router.push('/')
}

// Função para criar ícones SVG
function svgIcon(paths) {
  return {
    props: {},
    render() {
      return h(
        'svg',
        {
          viewBox: '0 0 24 24',
          width: '20',
          height: '20',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round'
        },
        paths.map((d) => h('path', { d }))
      )
    }
  }
}

const IconHome = svgIcon(['M3 9l9-7 9 7', 'M9 22V12h6v10', 'M21 9v11a1 1 0 0 1-1 1h-4', 'M4 9v11a1 1 0 0 0 1 1h4'])
const IconUser = svgIcon(['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'])
const IconTimes = svgIcon([
  'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
  'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  'M23 21v-2a4 4 0 0 0-3-3.87',
  'M16 3.13a4 4 0 0 1 0 7.75'
])
const IconBall = svgIcon([
  'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z',
  'M12 2c0 5 2 8 9 9.5',
  'M2.6 9c5 0 8 1.5 10 4.5',
  'M7 20.5c0-5 1.5-8 5.5-9.5'
])
const IconTrophy = svgIcon(['M8 21h8', 'M12 17v4', 'M7 4h10v5a5 5 0 0 1-10 0V4z', 'M17 5h3a2 2 0 0 1-2 4', 'M7 5H4a2 2 0 0 0 2 4'])
const IconCalendar = svgIcon([
  'M8 2v4',
  'M16 2v4',
  'M3 10h18',
  'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'
])
const IconChecklist = svgIcon(['M9 11l3 3L22 4', 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'])
const IconLogout = svgIcon(['M14 3h6a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-6', 'M14 12H3', 'M7 8l-4 4 4 4'])

const links = [
  { to: '/inicio', nome: 'Início', icon: IconHome },
  { to: '/jogadores', nome: 'Jogadores', icon: IconUser },
  { to: '/times', nome: 'Times', icon: IconTimes },
  { to: '/partidas', nome: 'Partidas', icon: IconBall },
  { to: '/campeonatos', nome: 'Campeonatos', icon: IconTrophy },
  { to: '/calendario', nome: 'Agendas', icon: IconCalendar },
  { to: '/checklist', nome: 'Checklist', icon: IconChecklist },
  { to: '/configuracoes', nome: 'Perfil', icon: IconUser }
]
</script>

<template>
  <aside class="sidebar">
    <div class="sb-logo">
      <div class="sb-badge">
        <img :src="logoUrl" alt="Logo Conecta Vôlei" @error="$event.target.style.display = 'none'" />
      </div>
      <span class="sb-title">Conecta Volei</span>
    </div>

    <nav class="nav">
      <router-link v-for="l in links" :key="l.to" :to="l.to" class="nav-item" active-class="nav-item-active">
        <component :is="l.icon" />
        <span>{{ l.nome }}</span>
      </router-link>

      <button type="button" class="nav-item" @click="sair">
        <component :is="IconLogout" />
        <span>Sair</span>
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  min-height: 100vh;
  flex-shrink: 0;
  box-sizing: border-box;
  background: #0b1440;
  color: #cfd6f7;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
}

.sb-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 32px; }

.sb-badge {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: #f0b429;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}
.sb-badge img { width: 100%; height: 100%; object-fit: cover; }
.sb-title { font-weight: 800; font-size: 1.1rem; color: #fff; }

.nav { display: flex; flex-direction: column; gap: 4px; }

.nav-item {
  width: 100%;
  box-sizing: border-box;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  color: #cfd6f7;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.15s ease, color 0.15s ease;
}
.nav-item:hover { background: rgba(255, 255, 255, 0.06); }
.nav-item-active { background: #f0b429; color: #0b1440; }
.nav-item-active:hover { background: #f0b429; }

@media (max-width: 700px) {
  .sidebar { width: 100%; min-height: 0; padding: 12px; }
  .sb-logo { margin-bottom: 12px; }
  .nav { flex-direction: row; overflow-x: auto; }
  .nav-item { width: auto; white-space: nowrap; }
}
</style>