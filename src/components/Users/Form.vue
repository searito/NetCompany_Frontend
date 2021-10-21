<template>
  <q-dialog ref="dialog" v-model="medium"
            transition-show="scale"
            transition-hide="jump-down"
            persistent
  >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-form greedy @submit="almacenar">
        <q-card-section class="text-body1">
          {{ id === 0 ? 'Agregar Usuario' : 'Editar Información' }}
        </q-card-section>
        <q-card-section class="q-pa-md">
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

            <!--    Level   -->
            <div class="col-xs-12 col-sm-12 col-md-6 q-pa-sm">
              <q-select dense
                        outlined
                        v-model="fields.nivel.data"
                        label="Nivel"
                        v-if="!loading"
                        transition-show="scale"
                        transition-hide="jump-down"
                        emit-value
                        map-options
                        rules="[ val => val !== null && val !== '' || 'Selecciona una opción']"
                        :error="fields.nivel.error"
                        :error-message="fields.nivel['error-message']"
                        :options="niveles"
                        :option-value="opt => opt.id"
                        :option-label="opt => opt.nombre"
              />
              <q-skeleton v-if="loading" class="q-my-xs" animation="fade" type="QInput"/>
            </div>

            <!--    Estado    -->
            <div class="col-xs-12 col-sm-12 col-md-6 q-pa-sm">
              <q-toggle v-model="fields.estado.data"
                        label="Estado"
                        checked-icon="check"
                        unchecked-icon="clear"
                        size="lg"
                        v-if="!loading"
                        color="primary"
                        :error="fields.estado.error"
                        :error-message="fields.estado['error-message']"
              />
              <q-skeleton v-if="loading" class="q-my-xs" dark animation="fade" type="QInput"/>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="around">
          <q-btn flat
                 color="negative"
                 :disable="loading"
                 label="Cerrar"
                 @click="hide"
          />
          <q-btn flat
                 type="submit"
                 color="primary"
                 label="enviar"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'
import { axiosInstance } from 'boot/axios'
import { Cookies } from 'quasar'

export default {
  name: 'Form',
  props: ['id'],
  data () {
    return {
      medium: true,
      loading: false,
      fields: {
        nombres: { 'data': '', 'error': false, 'error-message': '' },
        apellidos: { 'data': '', 'error': false, 'error-message': '' },
        correo: { 'data': '', 'error': false, 'error-message': '' },
        nivel: { 'data': '', 'error': false, 'error-message': '' },
        passwd: { 'data': '', 'error': false, 'error-message': '' },
        passwd2: { 'data': '', 'error': false, 'error-message': '' },
        estado: { 'data': false, 'error': false, 'error-message': '' }
      },
      niveles: [
        { id: 0, nombre: 'Normal' },
        { id: 1, nombre: 'Root' }
      ],
      errores: []
    }
  },
  created () {
    if (this.id !== 0) {
      this.edit()
    }
  },
  setup () {
    return {
      password: ref('txt_pwd'),
      isPwd: ref(true)
    }
  },
  computed: {
    mailRules () {
      return [
        val => val && val.length > 0 || 'Campo requerido',
        val => /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/.test(val) || 'Formato inválido para correo',
      ]
    },
    ConfirmPassword () {
      return [
        // val => val && val.length > 0 || 'Campo requerido',
        val => val === this.fields.passwd.data || 'Las contraseñas no coinciden'
      ]
    }
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    edit () {
      var uri = 'usuarios/edit/' + this.id
      axiosInstance.get(uri, {
        headers: {
          Authorization: 'Bearer ' + this.$q.cookies.get('authToken')
        }
      }).then(res => {
        var reg = res.data.response
        var state
        reg.estado ? state = true : state = false
        this.fields.nombres.data = reg.name
        this.fields.apellidos.data = reg.lastname
        this.fields.correo.data = reg.email
        this.fields.nivel.data = reg.level
        this.fields.estado.data = state
      }).catch(err => {
        console.error(err)
      }).finally(() => {})
    },
    almacenar () {
      var uri = 'usuarios'
      var params = new FormData()
      var estado = null
      this.loading = true
      for (var field in this.fields) {
        if (this.fields[field].error !== undefined) {
          this.fields[field].error = false;
          this.fields[field]['error-message'] = '';
        }
      }
      this.fields.estado.data === true ? estado = 1 : estado = 0
      params.append('nombres', this.fields.nombres.data)
      params.append('apellidos', this.fields.apellidos.data)
      params.append('correo', this.fields.correo.data)
      params.append('nivel', this.fields.nivel.data)
      params.append('estado', estado)
      if (this.fields.passwd.data !== null) {
        params.append('password', this.fields.passwd.data)
      }
      this.errores = {}
      if (this.id === 0){
        params.append('_method', 'POST')
      } else {
        params.append('id', this.id)
        params.append('_method', 'PUT')
      }
      axiosInstance['post'](uri, params, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + this.$q.cookies.get('authToken')
        }
      }).then(res => {
        switch (res.data.response) {
          case 200:
            this.notificacion('Exito', 'Registro almacenado', 'green-10')
            this.hide()
            break
          case 500:
            this.notificacion('Error', 'Revisa la información ingresada', 'red-10')
            break
        }
      }).catch(err => {
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
          this.notification('Error', 'Revisa la información ingresada', 'red-10')
        } else {
          this.notification('Error', 'Comunicate con tu administrador', 'red-10')
        }
      }).finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
      })
    },
    notificacion (message, caption, color) {
      this.$q.notify({
        message: message,
        caption: caption,
        position: 'top-right',
        color: color,
        avatar: '/icons/favicon-128x128.png',
        progress: true,
        actions: [
          { icon: 'close', color: 'white' }
        ]
      })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
