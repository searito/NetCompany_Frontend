<template>
  <q-page>
    <div class="row q-pa-md">
      <div class="col-12 q-py-md">
        <q-btn color="teal" label="nuevo" @click="create"/>
      </div>
      <div class="col-12">
        <q-table
          :rows="users"
          :columns="columns"
          row-key="name"
          flat
          bordered
          class="table-style"
        >
          <template v-slot:body="props" v-if="users !== undefined">
            <q-tr :props="props">
              <q-td key="id" :props="props">
                {{ props.row.id }}
              </q-td>
              <q-td key="estado" :props="props">
                <q-badge :color="props.row.estado ? 'positive': 'negative'">
                  {{ props.row.estado ? 'Activo' : 'Inactivo' }}
                </q-badge>
              </q-td>
              <q-td key="nombre" :props="props" class="text-left">
                {{ props.row.name +' '+ props.row.lastname }}
              </q-td>
              <q-td key="correo" :props="props" class="text-left">
                {{ props.row.email }}
              </q-td>
              <q-td key="nivel" :props="props">
                <q-badge :color="props.row.level ? 'teal': 'primary'">
                  {{ props.row.level ? 'Root' : 'Normal' }}
                </q-badge>
              </q-td>
              <q-td key="actions" :props="props">
                <q-btn-group>
                  <q-btn color="teal" icon="mdi-pencil" size="sm" @click="edit(props.row.id)"/>
                  <q-btn color="red-7" icon="mdi-trash-can" size="sm" @click="deleted(props.row.id)" />
                </q-btn-group>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { axiosInstance } from 'boot/axios'
import FormComponent from 'components/Users/Form'
import { ref } from 'vue'
import { Cookies } from 'quasar'

export default {
  name: 'Index',
  data () {
    return {
      uri: 'usuarios/read',
      users: [],
      loading: false,
      currentID: 0,
      columns: [
        { name: 'id', label: 'ID', align: 'center', sortable: true },
        { name: 'estado', label: 'Estado', align: 'center', sortable: true },
        { name: 'nombre', label: 'Nombre', align: 'center', sortable: true },
        { name: 'correo', label: 'Correo', align: 'center', sortable: true },
        { name: 'nivel', label: 'Nivel', align: 'center', sortable: true },
        { name: 'actions', label: '' }
      ]
    }
  },
  created () {
    this.getData()
    setInterval(() => {
      this.getData()
    }, 3000)
  },
  methods: {
    getData () {
      axiosInstance.get(this.uri, {
        headers: {
          Authorization: 'Bearer ' + this.$q.cookies.get('authToken')
        }
      }).then(res => {
        this.users = res.data.response
      }).catch(err => {
        console.error(err)
      }).finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
      })
    },
    create () {
      this.$q.dialog({
        component: FormComponent,
        componentProps: {
          id: this.currentID
        }
      })
    },
    edit (itm) {
      this.$q.dialog({
        component: FormComponent,
        componentProps: {
          id: itm
        }
      })
    },
    deleted (itm) {
      this.$q.dialog({
        title: 'Eliminar Registro',
        message: 'Deseas eliminar esta registro?',
        cancel: true,
        persistent: true,
        color: 'secondary'
      }).onOk(() => {
        this.erase(itm)
      })
    },
    erase (itm) {
      var uri = 'usuarios/delete/' + itm
      var params = new FormData()
      params.append('_method', 'DELETE')
      axiosInstance['post'](uri, params, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + this.$q.cookies.get('authToken')
        }
      }).then(res => {
        if (res.data.deleted == true) {
          this.notificacion('Exito', 'Registro eliminado', 'green-10')
        } else {
          this.notificacion('Error', 'Algo ha salido mal', 'red-10')
        }
      }).catch(() => {
        this.notification('Error', 'Comunicate con tu admin!', 'red-10')
      }).finally(() => {})
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
        ],
      })
    }
  }
}
</script>

<style lang="sass">
.table-style
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #263238
    color: antiquewhite

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
