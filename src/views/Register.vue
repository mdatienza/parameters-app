<template lang="pug">
  v-content
    v-container(fluid, fill-height)
      v-layout(align-center, justify-center)
        v-flex(xs12, sm8, md4, mt-5)
          v-card.elevation-1
            v-toolbar(dark, color='primary')
              v-toolbar-title Register
              v-spacer
              v-tooltip(bottom)
                v-btn(slot='activator', icon, large)
                  v-icon(large) person_add
                span Register
            v-card-text
              v-form
                v-text-field(prepend-icon='email', label='Email Address', v-model="email", type="email" required)
                v-text-field(prepend-icon='lock', label='Password', type='password', v-model="password" required)
                v-text-field(prepend-icon='lock', label='Confirm Password', type='password', v-model="confirmPassword" required)
            v-card-actions
              v-spacer
              v-btn(color="light-green", to="/login").white--text Back
              v-btn(color="primary", @click="signUp").white--text Register
    v-snackbar(v-model='snackbar', :bottom="y === 'bottom'", :left="x === 'left'", :multi-line="mode === 'multi-line'", :right="x === 'right'", :timeout='timeout', :top="y === 'top'", :vertical="mode === 'vertical'")
     | {{ text }}
     v-btn(dark="", flat="", @click="snackbar = false")
      v-icon close
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data: () => {
    return {
      email: null,
      password: null,
      confirmPassword: null,
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 3000,
      text: ''
    }
  },
  methods:{
    signUp () {
      if (this.password !== this.confirmPassword) {
        this.snackbar = true
        this.text='Password does not match!'
        return
      }else if(this.email === null || this.password === null || this.confirmPassword === null){
        this.snackbar = true
        this.text='Please fill-up the information needed'
        return
      }
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
        //console.log(`user`, user)
        this.email = null
        this.password = null
        this.confirmPassword = null
        this.snackbar = true
        this.text='Your account has been created'
        let vm = this
        setTimeout(() => {
          vm.$router.push({name: 'login'})
        }, 2000)
      }, (err) => {
        this.snackbar = true
        this.text=`Oops! Error: ${err.message}`
      })
    }
  },
  components: {

  }
}
</script>

<style scoped>
</style>
