<template>
  <div class="container row">
    <div class="col-xs-hidden col-sm-hidden col-md-3"></div>
    <div class="col-xs-12 col-sm-12 col-md-6 q-pa-md full-center">
      <q-card style="width: 100%">
        <q-card-section>
          <div class="text-h6 text-bold q-mb-xs text-center">Ingresa tus datos</div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit="registrar">
            <div class="row">
              <!--    Nombres   -->
              <div class="col-xs-12 col-sm-12 col-md-6 q-pa-sm">
                <q-input type="text"
                         v-model="fields.nombres.data"
                         outlined
                         clearable
                         dense
                         label="Nombres"
                         :rules="val => val && val.length > 0 || 'Campo requerido'"
                         required
                         autofocus
                         maxlength="20"
                         counter
                         :error="fields.nombres.error"
                         :error-message="fields.nombres['error-message']"
                         v-if="!loading"
                />
                <q-skeleton v-if="loading" class="q-my-xs" animation="fade" type="QInput"/>
              </div>

              <!--    Apellidos   -->
              <div class="col-xs-12 col-sm-12 col-md-6 q-pa-sm">
                <q-input type="text"
                         v-model="fields.apellidos.data"
                         outlined
                         clearable
                         dense
                         label="Apellidos"
                         :rules="val => val && val.length > 0 || 'Campo requerido'"
                         required
                         maxlength="20"
                         counter
                         :error="fields.apellidos.error"
                         :error-message="fields.apellidos['error-message']"
                         v-if="!loading"
                />
                <q-skeleton v-if="loading" class="q-my-xs" animation="fade" type="QInput"/>
              </div>

              <!--    Correo   -->
              <div class="col-xs-12 col-sm-12 col-md-6 q-pa-sm">
                <q-input type="email"
                         v-model="fields.correo.data"
                         outlined
                         clearable
                         dense
                         label="Correo electrónico"
                         required
                         maxlength="50"
                         counter
                         :rules="mailRules"
                         :error="fields.correo.error"
                         :error-message="fields.correo['error-message']"
                         v-if="!loading"
                />
                <q-skeleton v-if="loading" class="q-my-xs" animation="fade" type="QInput"/>
              </div>

              <!--    Contraseña    -->
              <div class="col-xs-12 col-sm-12 col-md-6 q-pa-sm">
                <q-input v-model="fields.passwd.data"
                         outlined
                         :type="isPwd ? 'password' : 'text'"
                         dense
                         clearable
                         label="Contraseña"
                         required
                         :rules="[ val => val && val.length > 0 || 'Contraseña no ingresada']"
                         counter
                         maxlength="10"
                         ref="txt_pwd"
                         :error="fields.passwd.error"
                         :error-message="fields.passwd['error-message']"
                         v-if="!loading"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <q-skeleton v-if="loading" class="q-my-xs" animation="fade" type="QInput"/>
              </div>

              <!--    Password Confirm    -->
              <div class="col-xs-12 col-sm-12 col-md-6 q-pa-sm">
                <q-input v-model="fields.passwd2.data"
                         outlined
                         :type="isPwd ? 'password' : 'text'"
                         dense
                         clearable
                         label="Repite la contraseña"
                         required
                         :rules="ConfirmPassword"
                         counter
                         maxlength="10"
                         :error="fields.passwd2.error"
                         :error-message="fields.passwd2['error-message']"
                         v-if="!loading"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <q-skeleton v-if="loading" class="q-my-xs" animation="fade" type="QInput"/>
              </div>

              <!--  Submit    -->
              <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="row">
                  <div class="col-xs-hidden col-sm-hidden col-md-4"></div>
                  <div class="col-xs-hidden col-sm-hidden col-md-4">
                    <q-btn  icon="mdi-account-plus"
                            label="Registrarme"
                            color="primary"
                            class="q-pa-sm full-width"
                            :disable="loading"
                            type="submit"
                    />
                  </div>
                  <div class="col-xs-hidden col-sm-hidden col-md-4"></div>
                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-xs-hidden col-sm-hidden col-md-3"></div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { axiosInstance } from 'boot/axios'

export default {
  name: "Registro",
  data() {
    return {
      url: '/auth/register',
      fields: {
        nombres: { 'data': '', 'error': false, 'error-message': '' },
        apellidos: { 'data': '', 'error': false, 'error-message': '' },
        correo: { 'data': '', 'error': false, 'error-message': '' },
        passwd: { 'data': '', 'error': false, 'error-message': '' },
        passwd2: { 'data': '', 'error': false, 'error-message': '' }
      },
      loading: false,
      errores: [],
    }
  },
  setup() {
    return {
      password: ref('txt_pwd'),
      isPwd: ref(true),
    }
  },
  computed: {
    mailRules(){
      return [
        val => val && val.length > 0 || 'Contraseña obligatoria',
        val => /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/.test(val) || 'Formato inválido para correo',
      ]
    },
    ConfirmPassword(){
      return [
        val => val && val.length > 0 || 'Campo requerido',
        val => val === this.fields.passwd.data || 'Las contraseñas no coinciden'
      ]
    }
  },
  methods: {
    registrar() {
      var params = new FormData()
      this.loading = true

      for (var field in this.fields) {
        if (this.fields[field].error !== undefined) {
          this.fields[field].error = false
          this.fields[field]['error-message'] = ''
        }
      }

      params.append('nombres', this.fields.nombres.data)
      params.append('apellidos', this.fields.apellidos.data)
      params.append('correo', this.fields.correo.data)
      params.append('password', this.fields.passwd.data)
      params.append('_method', 'POST')

      this.errores = {}
      axiosInstance['post'](this.url, params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        switch (res.data.response) {
          case 200:
            this.$q.dialog({
              html: true,
              color: 'green',
              title: '<div class="text-h6 text-green-10">Bienvenid@</div>',
              message: 'Registro realizado éxitosamente. <br> Te invitamos a que realices tu primer Login.'
            }).onOk(() => {
              this.$router.push('/')
            })
            this.loading = false
            break

          case 500:
            this.notificacion('Error', 'Ha ocurrido un problema, comunícate con el administrador', 'red-10')
            break
        }
      }).catch(err => {
        console.error(err)
        if (err.response.status === 422) {
          this.errores = err.response.data.errors
          for (var field in this.fields) {
            if (this.fields[field].error !== undefined) {
              if (this.errores !== undefined) {
                if (this.errores[field] !== undefined) {
                  this.fields[field].error = true
                  this.fields[field]['error-message'] = this.errores[field][0]
                } else {
                  this.fields[field].error = false
                  this.fields[field]['error-message'] = ''
                }
              }
            }
          }
          this.notificacion('Error', 'Revisa la información ingresada', 'red-10')
        } else {
          this.notificacion('Error De Red', 'Comunicate Con Un Administrador!!!', 'red-10')
        }
      }).finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
      })
    },
    notificacion(message, caption, color) {
      this.$q.notify({
        message: message,
        caption: caption,
        position: 'top-right',
        color: color,
        avatar: '/icons/favicon-128x128.png',
        progress: true,
        actions: [
          { icon: 'close', color: 'white' }
        ],
      })
    },
  }
}
</script>

<style lang="sass" scoped>
.container
  width: 100%
  height: 100vh
  background: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(/img/backgrounds/042.jpg)
  background-position: center
  background-size: cover
  position: relative

.full-center
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
</style>
