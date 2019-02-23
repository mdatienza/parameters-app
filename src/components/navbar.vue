<template lang="pug">
  v-toolbar(color="grey darken-5", @click="click",dense="", floating="")
    v-toolbar-items
      label.nav__button(for='file', title='Upload', role='button', v-if='!data.loaded')
       span.fa.fa-upload
      button.nav__button(type='button', data-action='restore', title='Undo (Ctrl + Z)', v-if='data.cropped')
       span.fa.fa-undo
      button.nav__button.nav__button--danger(type='button', data-action='remove', title='Delete (Delete)', v-if='data.loaded && !data.cropping')
       span.fa.fa-trash
      button.nav__button.nav__button--danger(type='button', data-action='clear', title='Cancel (Esc)', v-if='data.cropping')
       span.fa.fa-ban
      button.nav__button.nav__button--success(type='button', data-action='crop', title='OK (Enter)', v-if='data.cropping')
       span.fa.fa-check
      a.nav__button.nav__button--success(title='Download', :download='data.name', :href='data.url', v-if='downloadable && data.loaded')
       span.fa.fa-download
</template>

<script>
  export default {
    data() {
      return {
        downloadable: typeof document.createElement('a').download !== 'undefined',
      };
    },

    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
    },

    methods: {
      click({ target }) {
        const action = target.getAttribute('data-action') || target.parentElement.getAttribute('data-action');

        if (action) {
          this.$emit('change', action);
        }
      },
    },
  };
</script>

<style scoped>
  .navbar {
    float: right;
  }

  .nav__button {
    background-color: transparent;
    border-width: 0;
    color: #fff;
    cursor: pointer;
    display: block;
    float: left;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    width: 3rem;

    &:focus {
      outline: none;
    }

    &:hover {
      background-color: #0074d9;
      color: #fff;
    }
  }

  .nav--success:hover {
    background-color: #2ecc40;
  }

  .nav--danger:hover {
    background-color: #ff4136;
  }
</style>
