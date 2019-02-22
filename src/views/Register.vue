<template lang="pug">
  v-content
    v-container(fluid, fill-height)
      v-layout(align-center, justify-center)
        v-flex(xs12, sm8, md4)
          v-card.elevation-12
            v-toolbar(dark, color='primary')
              v-toolbar-title Register
              v-spacer
              v-tooltip(bottom)
                v-btn(slot='activator', icon, large)
                  v-icon(large) people
                span Register
            v-card-text
              v-form
                v-text-field(prepend-icon='email', label='Email', v-model="email", type="email" required)
                v-text-field(prepend-icon='lock', label='Password', type='password', v-model="password" required)
                v-text-field(prepend-icon='lock', label='Confirm Password', type='password', v-model="confirmPassword" required)
            v-card-actions
              v-spacer
              v-btn(color="primary", @click="signUp") Register
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
        this.text='Fill-up the information needed.'
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
p {
  color: blue;
  font-weight: bold
}
</style>
