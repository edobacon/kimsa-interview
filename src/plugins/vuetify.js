import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import es from 'vuetify/es5/locale/es'

Vue.use(Vuetify, {
  theme: {
    primary: '#133c7a',
    secondary: '#ff4532',
    accent: '#c1ccde',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  iconfont: 'md',
  lang: {
    locales: { es },
    current: 'es'
  },
})
