<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card-author" flat bordered>
      <q-img style="height: 400px;" fit="cover" :src="author.PHOTO ? `http://localhost:8000/media/${author.PHOTO}` : 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'" />

      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ author.NAME }}
          </div>
          <div class="row no-wrap items-center">
            {{ author.AGE }} anos
          </div>
        </div>
      </q-card-section>

      <!-- <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          place
        </div>
        <div class="text-caption text-grey">
          place
        </div>
      </q-card-section> -->

      <q-separator />

      <q-card-actions>
        <q-btn flat color="primary" @click="onMore()">
          Ver Livros
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
  export default {
    name: 'BookCard',

    props: {
      author: {
        type: Object
      }
    },

    data() {
      return {
      }
    },

    mounted() {
      console.log(this.author);

    },

    methods: {
      onMore() {
        this.$router.push(`/autor/${this.author.ID}`)
      }
    }
  }
</script>

<style>
.my-card-author {
  width: 20vw;
}
</style>
