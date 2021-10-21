<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-3 q-pa-xs">
        <q-card flat bordered class="bg-green text-white">
          <q-item>
            <q-item-section>
              <q-item-label class="text-center text-subtitle1">Clientes totales</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-card-section horizontal>
            <q-card-section class="text-center text-white">
              <q-icon name="mdi-account" size="lg"></q-icon>
            </q-card-section>
            <q-card-section class="col-8 text-h5 text-center">
              20
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-3 q-pa-xs">
        <q-card flat bordered class="bg-cyan-8 text-white">
          <q-item>
            <q-item-section>
              <q-item-label class="text-center text-subtitle1">Plan más vendidos</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-card-section horizontal>
            <q-card-section class="text-center text-white">
              <q-icon name="mdi-web" size="lg"></q-icon>
            </q-card-section>
            <q-card-section class="col-8 text-h6 text-left">
              10Mbps
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12  col-md-3 q-pa-xs">
        <q-card flat bordered class="bg-teal text-white">
          <q-item>
            <q-item-section>
              <q-item-label class="text-center text-subtitle1">Soportes Pendientes</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-card-section horizontal>
            <q-card-section class="text-center text-white">
              <q-icon name="mdi-hammer-wrench" size="lg"></q-icon>
            </q-card-section>
            <q-card-section class="col-8 text-h5 text-center">
              6
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-3 q-pa-xs">
        <q-card flat bordered class="bg-blue-grey text-white">
          <q-item>
            <q-item-section>
              <q-item-label class="text-center text-subtitle1">Total administradores</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-card-section horizontal>
            <q-card-section class="text-center text-white">
              <q-icon name="mdi-shield-account" size="lg"></q-icon>
            </q-card-section>
            <q-card-section class="col-8 text-h5 text-center">
              3
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
name: "Dashboard"
}
</script>

<style scoped>

</style>
