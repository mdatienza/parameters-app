import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import firebase from 'firebase'
import VueFire from 'vuefire'
import 'normalize.css'
import 'cropperjs/dist/cropper.css'
import './components'
import './styles/index.css'
import 'vuetify/dist/vuetify.min.css'
import './assets/main.styl'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'font-awesome/css/font-awesome.css'

Vue.use(Vuetify, {
  theme: {
    primary: '#43A047'
  }
})

Vue.use(VueFire)

Vue.config.productionTip = false

let app = ''

const config = {
  apiKey: "AIzaSyAkSTAofbMIu--x5dCp-vSwlZVlnRVLXKA",
  authDomain: "sample-vuejs-5bf0d.firebaseapp.com",
  databaseURL: "https://sample-vuejs-5bf0d.firebaseio.com",
  projectId: "sample-vuejs-5bf0d",
  storageBucket: "sample-vuejs-5bf0d.appspot.com",
  messagingSenderId: "712734268720"
}

firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
