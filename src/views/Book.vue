<template lang="pug">
    v-card.elevation-0
      v-card-text

        v-layout(row, justify-center)
          v-btn(primary, @click.native="dialog = !dialog") New Book
          v-dialog(v-model="dialog", persistent, width="600px")
            v-card
              v-card-title
                span.headline Image Upload
              v-card-text
                v-text-field(label="Title", required, v-model="newImage.title")
                v-text-field(label="Description", required, v-model="newImage.description")
                file-upload(@input="setFilename",@formData="acceptForm")
                v-progress-linear(v-model="progress", v-if="loading")
              v-card-actions
                v-spacer
                v-btn.white--text.darken-1(color="green", @click.native="addImage",:loading="loading", :disabled="loading",:class="loading ? 'blue--text' : ''") Save
                v-btn.white--text.darken-1(color="red", @click.native="dialog = false") Close


        v-container(fluid, grid-list-md)
          v-layout(row,wrap)
            v-flex(xs6, v-for="image in gallery", :key="image['.key']")
              v-card.dark--text
                v-img.white--text(height="200", :src="image.photoURL || null")
                v-card-title(primary-title)
                  div
                    h3.headline(v-text="image.title")
                    div(v-text="image.description")
                    v-btn(icon, @click="removeImage(image)").red--text
                     v-icon delete_forever
</template>

<script>
import firebase from 'firebase'
import FileUpload from '../components/FileUpload'
let galleryRef = firebase.database().ref('images')
let storageRef = firebase.storage().ref('images')
export default {
  name: 'gallery',
  firebase: {
    gallery: galleryRef
  },
  components: {
    FileUpload
  },
  data () {
    return {
      newImage: {
          title: '',
          description: '',
          uploader: '',
          photoURL: '',
      },
      dialog: false,
      file: '',
      filename: '',
      loading: false,
      loader: null,
      progress: 0
    }
  },
  methods: {
    addImage () {
      if(this.newImage.title === '' || this.newImage.description === '' || this.filename === ''){
        alert('Enter title, description and choose your image to upload.')
        return
      }

      this.loading = true
      this.loader = 'loading3'
      let storeImage = storageRef.child(this.filename).put(this.file)
      storeImage.on('state_changed', (snapshot) => {
        this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, () => {
        // console.log(`Error:`, error)
      }, () => {
        storeImage.snapshot.ref.getDownloadURL().then((file) => {
          this.newImage.photoURL = file
          galleryRef.push(this.newImage);

          this.newImage.title = ''
          this.newImage.description = ''
          this.newImage.photoURL = ''
          this.file = ''
          this.filename = ''
          this.dialog = false
          this.loading = false
          this.loader = null
        })
      })
      // save the image first on firebase then once done / success then save the gallery data into our firebase database.
      // we do this because we need to get the url first of the image then update the newImage data photoURL
    },
    removeImage (image) {
      let x = confirm("Do you wish to delete this image?")
      if(x == true){
        galleryRef.child(image['.key']).remove()
      }
    },
    setFilename (filename) {
      this.filename = filename //tyty
    },
    acceptForm (form) {
      this.file = form
    }
  }
}
</script>

<style scoped>
</style>
