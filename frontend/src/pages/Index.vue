<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
    <q-btn :to="{ name: 'grupo' }">grupo</q-btn>
    <q-btn :to="{ name: 'atividade' }">atividade</q-btn>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
