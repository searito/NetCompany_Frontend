<template>
  <div class="container row">
    <div class="col-xs-hidden col-sm-0 col-md-4 q-pa-xs">
      &nbsp;
    </div>
    <div class="col-xs-12 col-sm-12 col-md-4 q-pa-md full-center">
      <q-card style="width: 100%">
        <q-card-section>
          <div class="text-h6 text-bold q-mb-xs text-center">Iniciar Sesión</div>
          <q-form class="q-gutter-md" @submit="login">
            <div class="row q-pa-xs">
              <div class="col-12 q-my-sm">
                <q-input outlined
                         type="email"
                         v-model="fields.email"
                         dense
                         clearable
                         label="Correo Electrónico"
                         :rules="Correo"
                         required
                         autofocus
                />
              </div>

              <div class="col-12 q-my-sm">
                <q-input v-model="fields.password"
                         outlined
                         :type="isPwd ? 'password' : 'text'"
                         dense
                         clearable
                         label="Contraseña"
                         required
                         :rules="[ val => val && val.length > 0 || 'Contraseña no ingresada']"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>
              <div class="col-12 q-my-sm">
                <div class="row">
                  <div class="col-6 col-xs-12 col-sm-12 col-md-6 q-pa-sm">
                    <q-btn type="submit"
                           icon="mdi-key"
                           label="ingresar"
                           color="primary"
                           class="q-pa-sm full-width"
                    />
                  </div>
                  <div class="col-6 col-xs-12 col-sm-12 col-md-6 q-pa-sm">
                    <q-btn to="/registro"
                           icon="mdi-account-plus"
                           label="Registrarme"
                           color="primary"
                           class="q-pa-sm full-width"
                           flat
                    />
                  </div>
                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-xs-hidden col-sm-0 col-md-4 q-pa-xs">
      &nbsp;
    </div>
  </div>
</template>

<script>
import { axiosInstance } from 'boot/axios'
import { ref } from 'vue'
import { Cookies } from 'quasar'

export default {
  data(){
    return {
      fields: {
        email: null,
        password: null,
      }
    }
  },
  setup(){
    return {
      password: ref(''),
      isPwd: ref(true),
    }
  },
  computed: {
    Correo() {
      return [
        val => val && val.length > 0 || 'Contraseña obligatoria',
        val => /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/.test(val) || 'Formato inválido para correo',
      ]
    }
  },
  methods: {
    login(){
      var params = new FormData()
      var uri = 'auth/login'
      params.append('email', this.fields.email)
      params.append('password', this.fields.password)
      params.append('_method', 'POST')
      axiosInstance['post'](uri, params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        var result = res.data.response
        if (result.success === false){
          this.$q.dialog({
            title: '<div class="text-negative">Error</div>',
            html: true,
            message: '¡Credenciales Incorrectas!',
            color: 'negative'
          })
        } else {
          Cookies.set('authToken', result.data.token, {
            secure: true
          })
          Cookies.set('user', result.data.name, {
            secure: true
          })
          Cookies.set('level', result.data.level, {
            secure: true
          })
          this.$router.push('/dashboard')
        }
      }).catch(err => {
        console.error(err)
        this.$q.notify({
          message: 'Error',
          caption: 'Ha ocurrido un error',
          position: 'top-right',
          color: 'red-10',
          avatar: '/icons/favicon-128x128.png',
          progress: true,
          actions: [
            { icon: 'close', color: 'white' }
          ],
        })
      }).finally(() => {})
    },
  }
}
</script>

<style lang="sass" scoped>
.container
  width: 100%
  height: 100vh
  background-color: #1976D2

.full-center
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
</style>
