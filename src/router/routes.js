import { Cookies } from 'quasar'

function auth (to, from, next) {
  var isAuth = false
  Cookies.has('authToken') ? isAuth = true : isAuth = false
  isAuth ? next() : next('/')
}

const routes = [
  {
    path: '/',
    component: () => import('pages/Auth/Login'),
    name: 'login'
  },
  {
    path: '/registro',
    component: () => import('pages/Auth/Registro'),
    name: 'registro'
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout'),
    children: [
      {
        path: '',
        component: () => import('pages/Dashboard/Index'),
        name: 'dashboard',
        beforeEnter: auth
      }
    ]
  },
  {
    path: '/usuarios',
    component: () => import('layouts/MainLayout'),
    children: [
      {
        path: '',
        component: () => import('pages/Usuarios/Index'),
        name: 'usuarios',
        beforeEnter: auth
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
