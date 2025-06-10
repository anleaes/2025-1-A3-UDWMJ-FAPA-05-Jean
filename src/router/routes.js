const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/login', component: () => import('pages/LoginPage.vue')},
      { path: '/register', component: () => import('pages/RegisterPage.vue')},
      { path: '/logout', component: () => import('pages/LogoutPage.vue')},
      { path: '/data/:id', component: () => import('pages/DataPage.vue')},
      { path: '/autor/:id', component: () => import('pages/AuthorPage.vue')},
      { path: '/user', component: () => import('pages/ClientPage.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
