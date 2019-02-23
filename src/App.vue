<template lang="pug">
  v-app
    v-toolbar(color="primary", v-if="user")
      v-toolbar-side-icon(@click.stop="drawer = !drawer").white--text
      v-toolbar-title.white--text Parameters
      v-spacer
      v-toolbar-items.hidden-sm-and-down
        v-btn(:to="{ name: 'student' }", flat).white--text Student
        v-btn(:to="{ name: 'blog' }", flat).white--text Blog
        v-btn(:to="{ name: 'view-blog' }", flat).white--text View Blog
        v-btn(:to="{ name: 'image-editor' }", flat).white--text Image Editor
        v-btn(@click="logoutUser", flat).white--text Log Out
        v-layout(row, justify-center)

    v-navigation-drawer(v-model='drawer', absolute='', temporary='', v-if="user")
     v-list.pa-1
      v-list-tile(avatar='')
       v-list-tile-avatar
        img(src='./assets/avatar.png')
       v-list-tile-content
        v-list-tile-title {{ this.user.email }}
     v-list.pt-0(dense='')
      v-divider
      v-list-tile(v-for='item in items', :key='item.title',:to="item.url" , @click='' router)
       v-list-tile-action
        v-icon {{ item.icon }}
       v-list-tile-content
        v-list-tile-title {{ item.title }}
      v-list-tile(@click="logoutUser")
       v-list-tile-action
        v-icon exit_to_app
       v-list-tile-content
        v-list-tile-title Log Out
    div
      router-view
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'app',
  data: () => {
    return {
      user: null,
      drawer: null,
      items: [
        { title: 'Student', icon: 'people', url: '/student'},
        { title: 'Blog', icon: 'book', url: '/blog'},
        { title: 'View Blog', icon: 'bookmarks', url: '/view-blog'},
        { title: 'Image Editor', icon: 'image', url: '/image-editor'}
      ]
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
        this.drawer = null
        this.$router.push({name: 'login'})
      })
    }
  }
}
</script>

<style lang="stylus">
</style>
