<template lang="pug">
  //- vista de proveedores, muestra cada proveedor mediante componente 'Provider'
  v-flex#top(xs12, md8)
    //- muestra estado de visualizacion (de, hasta y cuantos resultados) solo en pantallas pequeñas
    ResultadosLabel.hidden-md-and-up(:to="to", :from="from", :total="total")
    //- mostrar barra de carga mientras se realiza consulta => this.cargandoDatos: bool
    v-progress-linear(indeterminate, v-if="cargandoDatos", color="accent")
    template(v-if="resultados.length === 0")
      Vacio
    template(v-else)
      template(v-for="provider in resultados")
        Provider.mb-2(:provider="provider")
      ResultadosLabel(:to="to", :from="from", :total="total")
        v-pagination(color="secondary" :length="totalPaginas", v-model="paginaActual", @input="cambiarPagina", @next="cambiarPagina", @previous="cambiarPagina", :disabled="cargandoDatos")

</template>

<script>
import Provider from '../components/Provider'
import Vacio from '../components/Vacio'
import ResultadosLabel from '../components/ResultadosLabel'
export default {
  props: {
    //- recibe query para consulta de API
    query: String
  },
  components: {
    Provider,
    Vacio,
    ResultadosLabel
  },
  data () {
    return {
      resultados: [],
      // parametros de paginacion
      paginaActual: 1,
      totalPaginas: 0,
      // parametros de lectura
      from: 0,
      to: 0,
      total: 0,
      // bool de consulta de API
      cargandoDatos: false
    }
  },
  async mounted () {
    // consultar por datos iniciales al cargar el componente
    await this.consultaAPI()
  },
  methods: {
    async consultaAPI () {
      try {
        // bool de estado de carga de datos
        this.cargandoDatos = true
        // armar url de consulta depenfiendo si debe tener querys añadidas o no
        // incluye ratings y max de 10 resultados por pagina
        const url = 'http://18.208.195.101/we-help-api/v1/public/providers?with_ratings=1&per_page=10'
        let finalURL = ''
        if (this.query) {
          finalURL = url + this.query
        } else {
          finalURL = url
        }
        // consumir API
        const response = await fetch(`${finalURL}&page=${this.paginaActual}`, {method: 'GET'})
        const data = await response.json()
        const result = data.result.providers
        // establecer parametros de lectura = pagina inicial, total de paginas en la b
        this.paginaActual = result.current_page
        this.totalPaginas = result.last_page
        // parametros de visalizacion/paginacion
        this.to = result.to
        this.from = result.from
        this.total = result.total
        // cargar resulktados y mapear segun perfil
        this.resultados =  this.mapearDatos(result.data)
        this.cargandoDatos = false
        // enviar usuario al top de la muestra de resultados para facilitar revision
        this.goToTop()
      } catch (error) {
        console.log(error)
        this.cargandoDatos = false
      }
    },
    mapearDatos (data) {
      return data.map(item => {
        // establecer pefil de datos necesarios a mostrar/usar
        let perfil = {
          id: 0,
          nombre: '',
          tipo: '',
          rating_avg: 0,
          rating_count: 0,
          settings: null,
          imagen: null
        }
        // cargar datos al perfil según tipo de usuario
        if (!item.user) {
          perfil.tipo = 'institution'
          perfil.nombre = item.institution.name
          perfil.imagen = item.institution.logo
        } else if (!item.institution) {
          perfil.tipo = 'specialist'
          let apellido = item.user.last_name ? item.user.last_name : item.user.last_names
          perfil.nombre = item.user.first_name + ' ' + apellido
          perfil.imagen = item.user.avatar
        }
        perfil.id = item.id
        // revisar que promedios y total calificaciones no sean null
        perfil.rating_avg = item.ratings_summary.avg === null ? 0 : +parseFloat(item.ratings_summary.avg).toFixed(1)
        perfil.rating_count = item.ratings_summary.count === null ? 0 : parseInt(item.ratings_summary.count)
        //parseInt(item.ratings_summary.count)
        perfil.settings = item.settings
        return perfil
      })
    },
    cambiarPagina (pagina) {
      // recibe el numero de pagina a revisar, cambia la pagina y consulta API
      if (event !== undefined) {
        this.paginaActual = pagina
        this.consultaAPI()
      }
    },
    goToTop () {
      // navegar a la parte superior de la muestra de resultados
      window.location.href = '#top'
    }
  }
}
</script>

