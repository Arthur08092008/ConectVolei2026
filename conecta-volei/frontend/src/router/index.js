import { createRouter, createWebHistory } from 'vue-router'
import { TOKEN_KEY } from '../services/api'
import Login from '../views/Login.vue'
import Cadastrar from '../views/Cadastrar.vue'
import Inicio from '../views/Inicio.vue'
import Jogadores from '../views/Jogadores.vue'
import Times from '../views/Times.vue'
import Partidas from '../views/Partidas.vue'
import Campeonatos from '../views/Campeonatos.vue'
import Checklist from '../views/Checklist.vue'
import Calendario from '../views/Calendario.vue'
import Configuracoes from '../views/Configuracoes.vue'

const auth = { requiresAuth: true }

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Login, meta: { public: true } },
    { path: '/cadastro', component: Cadastrar, meta: { public: true } },
    // Se você já tem EsqueciSenha.vue / RedefinirSenha.vue, descomente:
    // { path: '/esqueci-senha', component: () => import('../views/EsqueciSenha.vue'), meta: { public: true } },
    { path: '/inicio', component: Inicio, meta: auth },
    { path: '/jogadores', component: Jogadores, meta: auth },
    { path: '/times', component: Times, meta: auth },
    { path: '/partidas', component: Partidas, meta: auth },
    { path: '/campeonatos', component: Campeonatos, meta: auth },
    { path: '/checklist', component: Checklist, meta: auth },
    { path: '/calendario', component: Calendario, meta: auth },
    { path: '/configuracoes', component: Configuracoes, meta: auth },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (to.meta.requiresAuth && !token) return '/'
  if (to.meta.public && token) return '/inicio'
})

export default router
