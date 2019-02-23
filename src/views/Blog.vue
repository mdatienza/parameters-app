<template lang="pug">
v-layout
 v-flex(xs12, sm10, offset-sm1, mt-5)
  #app
   vue-editor(v-model='newBlog.content')
   v-btn(color="light-green", @click="createBlog").white--text Add Post
 v-snackbar(v-model='snackbar', :bottom="y === 'bottom'", :left="x === 'left'", :multi-line="mode === 'multi-line'", :right="x === 'right'", :timeout='timeout', :top="y === 'top'", :vertical="mode === 'vertical'")
  | {{ text }}
  v-btn(dark="", flat="", @click="snackbar = false")
   v-icon close
</template>

<script>
import firebase from 'firebase'
import { VueEditor } from 'vue2-editor'
let blogList = firebase.database().ref('blog')

export default {
  name: 'blog',
  firebase: {
    blogs: blogList
  },
  components: {
    VueEditor
  },
  data () {
    return {
      newBlog: {
          content: null
      },
      content: null,
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 3000,
      text: null
    }
  },
  methods: {
    createBlog () {
        if(this.newBlog['content'] === null){
          this.snackbar = true
          this.text='There are no blog to be posted'
          return
        }
        blogList.push(this.newBlog)
        this.snackbar = true
        this.text='Blog has been added successfully'

        this.newBlog['content'] = null
    }
  }
}
</script>

<style scoped>
  #app{
    margin:5px;
  }
</style>
