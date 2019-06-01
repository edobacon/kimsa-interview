<template lang="pug">
  //- mostrar numeracion de resultados, puede recibir slots como el navegador/paginacion
  .text-xs-center.white--text(v-if="total > 0")
    p.mb-2 Mostrando resultados {{from||0}}-{{to||0}} de {{total||0}}
    slot
</template>
<script>
export default {
  // recibe parametros de lectura
  props: {
    // desde que numero se muestra 
    from: Number,
    // hasta que numero se muestra
    to: Number,
    // cantidad total de proveedores que se muestran
    total: Number
  }
}
</script>

