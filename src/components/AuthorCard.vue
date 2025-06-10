<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card-author" flat bordered>
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
  width: 30vw;
}
</style>
