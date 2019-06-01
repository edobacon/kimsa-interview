<template lang="pug">
  //- vista de 1 proveedor
  v-card
    v-container(grid-list-md)
      v-layout(row, wrap)
        v-flex(xs4, sm3, md3, xl2, align-self-center)
          //- revisar si el proveedor posee imagen, en caso de no selccionr uno por tipo de proveedor
          template(v-if="provider.imagen")
            img(:class="avatarClases", :src="provider.imagen")
          template(v-else-if="provider.tipo === 'institution'")
            img(:class="avatarClases", src="../assets/institution.svg")
          template(v-else-if="provider.tipo === 'specialist'")
            img(:class="avatarClases", src="../assets/specialist.svg")
          template(v-else)
            img(:class="avatarClases", src="../assets/null.svg")
        v-flex.text-xs-left(xs8, sm5, md5, xl6, align-self-center)
          h2.headline.ml-2.primary--text {{provider.nombre}}
          p.mb-0.ml-2.grey--text.lighten-1 {{diccionario(provider.tipo)}}
          v-rating(readonly, half-increments, small, v-model="provider.rating_avg", color="secondary", background-color="secondary")
          p.mb-0.ml-2.primary--text
            strong ({{provider.rating_avg}} | {{provider.rating_count}} {{provider.rating_count > 1 ? 'calificaciones' : 'calificación'}})
        v-flex(xs12, sm4, align-self-center)
          //- mostrar botones de acciones posibles segun settings publicas
          v-btn(color="primary", block, depressed, outline, v-if="provider.settings.allow_public_scheduling || false", small, @click="agendarHora(provider.id)") Agendar Hora
          v-btn(color="secondary", block, depressed, outline, v-if="provider.settings.allow_public_quotation || false", small, @click="solicitarPresupuesto(provider.id)") Solicitar Presupuesto
</template>

<script>
export default {
  props: {
    //- recibe datos del proveedor / perfil
    provider: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // clases aplicadas a la imagen de cada proveedor
      avatarClases: 'responsive redondo mx-auto avatar'
    }
  },
  methods: {
    agendarHora (id) {
      // acciones al solicitar hora
      console.log('agendando hora a id: ' + id)
    },
    solicitarPresupuesto (id) {
      // acciones al solicitar presupuesto
      console.log('solicitando presupuesto a id: ' + id)
    },
    diccionario (clase) {
      // recibe el tipo de proveedor  y lo retorna en español
      switch (clase) {
        case 'institution':
          return 'Institución'
        case 'specialist':
          return 'Especialista'
        default:
          return ''
      }
    }
  }
}
</script>


<style>
.responsive {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}
.redondo {
  border-radius: 50%;
}
.avatar {
  max-width: 125px;
  height: auto;
}
</style>

