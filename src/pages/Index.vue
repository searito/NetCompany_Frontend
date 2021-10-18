<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    <q-card dark flat>
      <q-card-section class="text-white">
        Hola
      </q-card-section>
      <q-card-actions>
        <q-btn color="amber-10" label="Hola" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex'
})
</script>
