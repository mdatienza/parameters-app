<template lang="pug">
v-content
  v-container
    navbar.mb-3(:data="data", @change="change")
    v-layout(row, wrap)
      v-flex(xs12)
        main.main
          editor(v-if="data.loaded", ref="editor", :data="data")
          loader(v-else, ref="loader", :data="data")
</template>

<script>
  export default {
    data() {
      return {
        //DEFINE BINDED VARIABLES
        data: {
          cropped: false,
          cropping: false,
          loaded: false,
          name: '',
          previousUrl: '',
          type: '',
          url: '',
        },
      };
    },
    methods: {
      change(action) {
        const { editor } = this.$refs;

        switch (action) {
          case 'crop':
            editor.crop();
            break;

          case 'clear':
            editor.clear();
            break;

          case 'restore':
            editor.restore();
            break;

          case 'remove':
            editor.reset();
            break;

          default:
        }
      },
    }
  }
</script>

<style scoped>
</style>
