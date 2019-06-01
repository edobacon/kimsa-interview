<template lang="pug">
  //- muestra los filtros y los envia a la vista general de proveedores
  v-container(grid-list-md)
    v-layout(row, wrap)
      v-flex(xs12, md4, order-md2)
        v-card
          v-toolbar.accent(dense, card)
            v-toolbar-title Filtros
          v-card-text
            v-text-field(label="Nombre de Proveedor", prepend-icon="search", v-model="filtros.name", @keyup.enter="filtrar")
            v-select(label="Tipo de Proveedor", :items="tipos", item-text="text", item-value="value", v-model="filtros.only")
            p.mb-0 
              strong.primary--text Reputación: 
              span(v-if="slider[0] === sliderMin && slider[1] === sliderMax") Todos
              span(v-else) {{slider[0]}} a {{slider[1]}}
            v-range-slider(thumb-label="always", :min="sliderMin", :max="sliderMax", v-model="slider", thumb-size="20")
          v-card-actions
            v-spacer
            v-btn(color="secondary", depressed, outline, @click="resetFiltros") reset
            v-btn(color="primary", depressed, outline, @click="filtrar") filtrar     
      Providers(:query="query", ref="providers")
</template>
<script>
import Providers from './Providers'

export default {
  name: 'Vista',
  components: {
    Providers
  },
  data () {
    return {
      query: '',
      // parametros de slider
      slider: [0, 5],
      sliderMin: 0,
      sliderMax: 5,
      // parametro de filtros
      filtros: {
        name: null,
        reputation: null,
        only: null
      },
      // lsita de tipos para seleccionar en filtro
      tipos: [
        {text: 'Todos', value: null},
        {text: 'Instituciones', value: 'institutions'},
        {text: 'Especialistas', value: 'specialists'}
      ]
    }
  },
  methods: {
    async resetFiltros () {
      // reinicia filtros a null
      this.query = ''
      this.slider = [0, 5]
      // set pagina a 1
      this.$refs.providers.paginaActual = 1
      await Object.keys(this.filtros).forEach(name => {
        this.filtros[name] = null
      })
      // solicita pagina 1 sin filtros
      await this.$refs.providers.consultaAPI()
    },
    async filtrar () {
      // query inicial vacia
      this.query = ''
      // revisa si hay modificacion en reputacion y lo carga a this.filtros
      let rep = this.slider.toString()
      if (rep === '0,5') {
        this.filtros.reputation = null
      } else {
        this.filtros.reputation = rep
      }
      // revisa los parametros en filtros
      await Object.keys(this.filtros).forEach(name => {
        if (this.filtros[name]) {
          let add = '&' + name + '=' + this.filtros[name]
          this.query += add
        }
      })
      // set pagina a 1
      this.$refs.providers.paginaActual = 1
      // realizar consulta a API
      await this.$refs.providers.consultaAPI()
    }
  }
}
</script>
