<template lang="pug">
  v-content
    v-container(fluid, fill-height)
      v-layout(align-center, justify-center)
        v-flex(xs12, sm8, md4)
          v-card.elevation-12
            v-toolbar(dark, color='primary')
              v-toolbar-title Parameters
              v-spacer
              v-tooltip(bottom)
                v-btn(slot='activator', icon, large, target='_blank')
                  v-icon(large) image
                span Parameters
            v-card-text
              v-form
                v-text-field(prepend-icon='email', label='Email Address', type='text', v-model="email")
                v-text-field(prepend-icon='lock', label='Password', type='password', v-model="password")
            v-card-actions
              v-spacer
              v-btn(color='red', to='/register').white--text Sign Up
              v-btn(color='green', @click="signIn").white--text Login
    v-snackbar(v-model='snackbar', :bottom="y === 'bottom'", :left="x === 'left'", :multi-line="mode === 'multi-line'", :right="x === 'right'", :timeout='timeout', :top="y === 'top'", :vertical="mode === 'vertical'")
     | {{ text }}
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data: () => {
    return {
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
      if(this.email === null || this.password === null){
        this.snackbar = true
        this.text='Fill-up the information needed.'
        return
      }
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
        this.snackbar = true
        this.text = `Welcome ${user.user.email}`
        // console.log(user)
        let vm = this
        setTimeout(() => {
          vm.$router.push({name:'user'})
        }, 2000)
      }, (err) => {
        this.snackbar = true
        this.text = `Oops! ${err.message}`
      })
    }
  }
}
</script>

<style scoped>
p {
  color: blue;
  font-weight: bold
}
</style>
