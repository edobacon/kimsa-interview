<template lang="pug">
  //- pagina de carga inicial
  v-app
    v-content.primary
      Header
      VistaFiltros
</template>

<script>
import VistaFiltros from './components/VistaFiltros'
import Header from './components/Header'
export default {
  name: 'App',
  components: {
    VistaFiltros,
    Header
  }
}
</script>
