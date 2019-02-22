<template lang="pug">
  v-app
    v-toolbar(color="primary", v-if="user")
      v-toolbar-side-icon.white--text
      v-toolbar-title.white--text Parameters
      v-spacer
      v-toolbar-items.hidden-sm-and-down
        v-btn(:to="{ name: 'student' }", flat).white--text Student
        v-btn(:to="{ name: 'blog' }", flat).white--text Blog
        v-btn(:to="{ name: 'view-blog' }", flat).white--text View Blog
        v-btn(:to="{ name: 'image-editor' }", flat).white--text Image Editor
        v-btn(@click="logoutUser", flat).white--text Logout
        v-layout(row, justify-center)
    div
      router-view
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'app',
  data: () => {
    return {
      user: null
    }
  },
  watch: {
    '$route' () {
      firebase.auth().onAuthStateChanged(() => {
        this.user = firebase.auth().currentUser
      })
    }
  },
  mounted () {
  },
  methods: {
    logoutUser () {
      firebase.auth().signOut().then(() => {
        this.$router.push({name: 'login'})
      })
    }
  }
}
</script>

<style lang="stylus">
</style>
