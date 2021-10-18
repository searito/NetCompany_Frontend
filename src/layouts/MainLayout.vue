<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-blue-grey-10">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Netcompany
        </q-toolbar-title>

        <div>
          <q-btn icon="mdi-power"
                 label="Salir"
                 flat
                 @click="logout"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      elevated
      class="bg-blue-grey-10"
      :width="250"
      :breakpoint="400"
    >
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px;">
        <q-list padding>
          <q-item clickable v-ripple class="text-white"
                  v-for="link in iconos" :key="link.id"
                  tag="a" :href="link.link"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              {{ link.title }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top"
             src="https://cdn.quasar.dev/img/material.png"
             style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">{{ user.name }}</div>
          <div>{{ user.level === 1 ? 'Root' : 'Cliente' }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <q-toolbar class="bg-toolbar q-pa-sm q-ma-none bg-blue-grey-10" style="min-height: 30px">
        <q-toolbar-title class="q-pa-none q-ma-none text-center text-caption">
          2021 NetCompany &trade; || Todos Los Derechos Reservados
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Cookies } from 'quasar'

export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      iconos: [
        { id: 1, title: 'Clientes', icon: 'mdi-account-group', link: '/clientes'},
        { id: 2, title: 'Planes', icon: 'mdi-web', link: '/planes' },
        { id: 3, title: 'Pagos', icon: 'mdi-cash', link: '/pagos' },
        { id: 4, title: 'Usuarios', icon: 'mdi-account', link: '/usuarios' },
      ],
      user: {
        name: '',
        level: ''
      }
    }
  },
  created () {
    this.getCookies()
  },
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  methods: {
    getCookies() {
      if (Cookies.has('user')) {
        this.user.name = Cookies.get('user')
        this.user.level = Cookies.get('level')
      } else {
        this.$router.push('/')
      }
    },
    logout() {
      this.$q.dialog({
        html: true,
        color: 'blue-grey-10',
        title: '<div class="text-h6 text-blue-grey-10">Salir</div>',
        cancel: true,
        persistent: true,
        message: '¿Realmente deseas cerrar sesión?'
      }).onOk(() => {
        Cookies.remove('authToken')
        Cookies.remove('user')
        Cookies.remove('level')
        this.$router.push('/')
      }).onCancel(() => {})
    },
  }
})
</script>
