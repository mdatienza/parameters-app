<template lang="pug">
  v-content
    v-container(fluid, fill-height)
      v-layout(align-center, justify-center)
        v-flex(xs12, sm8, md4, mt-5)
          v-card.elevation-1
            v-toolbar(dark, color='primary')
              v-toolbar-title Login
              v-spacer
              v-tooltip(bottom)
                v-btn(slot='activator', icon, large, target='_blank')
                  v-icon(large) developer_board
                span Login
            v-card-text
              v-form
                v-text-field(prepend-icon='email', label='Email Address', type='text', v-model="email")
                v-text-field(prepend-icon='lock', label='Password', type='password', v-model="password")
            v-card-actions
              v-spacer
              v-btn(color="light-green", to='/register').white--text Sign Up
              v-btn(color="primary", @click="signIn").white--text Login
    v-snackbar(v-model='snackbar', :bottom="y === 'bottom'", :left="x === 'left'", :multi-line="mode === 'multi-line'", :right="x === 'right'", :timeout='timeout', :top="y === 'top'", :vertical="mode === 'vertical'")
     | {{ text }}
     v-btn(dark="", flat="", @click="snackbar = false")
      v-icon close
</template>

<script>
//IMPORT GOOGLE FIREBASE
import firebase from 'firebase'
export default {
  name: 'login',
  data: () => {
    return {
      //DEFINE BINDED VARIABLES
      email: null,
      password: null,
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 3000,
      text: ''
    }
  },
  methods: {
    signIn () {
      //VALIDATE EMAIL AND PASSWORD
      if(this.email === null || this.password === null){
        this.snackbar = true
        this.text='Please fill-up the information needed'
        return
      }
      //COMMIT LOGIN AND VERIFICATION TO FIREBASE
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
        this.$router.push({name:'user'})
      }, (err) => {
        this.snackbar = true
        this.text = `Oops! ${err.message}`
      })
    }
  }
}
</script>

<style scoped>
</style>
