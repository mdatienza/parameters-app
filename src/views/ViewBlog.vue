<template lang="pug">
 v-container(fluid, grid-list-md)
  v-layout(row,wrap)
   v-flex(sm6, v-for="blog in blogs", :key="blog['.key']")
    v-card
     v-card-title(primary-title="")
      div
       v-flex(xs12)
        div(v-html="blog.content", class="cus-card")
     v-card-actions
      v-icon(color="red" @click="deleteBlog(blog)").white--text delete_forever
</template>

<script>
import firebase from 'firebase'
let blogList = firebase.database().ref('blog')

export default {
  name: 'blog',
  firebase: {
    blogs: blogList
  },
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    deleteBlog(blog) {
      blogList.child(blog['.key']).remove()
    }
  }
}
</script>

<style scoped>
</style>
