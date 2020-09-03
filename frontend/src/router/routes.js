
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'grupo', component: () => import('pages/Grupo.vue'), name: 'grupo' },
      { path: 'grupo/novo', component: () => import('pages/GrupoManter.vue'), name: 'grupo/novo' },
      { path: 'grupo/:idgrupo/editar', component: () => import('pages/GrupoManter.vue'), name: 'grupo/editar' },
      { path: 'grupo/:idgrupo/atividade', component: () => import('pages/GrupoAtividade.vue'), name: 'grupo/atividade' },
      { path: 'atividade', component: () => import('pages/Atividade.vue'), name: 'atividade' },
      { path: 'atividade/nova', component: () => import('pages/AtividadeNova.vue'), name: 'atividade/nova' }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
