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
    path: '/clientes',
    component: () => import('layouts/MainLayout'),
    children: [
      {
        path: '',
        component: () => import('pages/Clientes/Index'),
        name: 'clientes',
        beforeEnter: auth
      }
    ]
  },
  {
    path: '/planes',
    component: () => import('layouts/MainLayout'),
    children: [
      {
        path: '',
        component: () => import('pages/Planes/Index'),
        name: 'planes',
        beforeEnter: auth
      }
    ]
  },
  {
    path: '/pagos',
    component: () => import('layouts/MainLayout'),
    children: [
      {
        path: '',
        component: () => import('pages/Pagos/Index'),
        name: 'pagos',
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
