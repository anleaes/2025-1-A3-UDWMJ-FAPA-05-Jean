<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-img src="https://uyc.thecenterforsalesstrategy.com/hs-fs/hubfs/21%20Books%20on%20Our%20Shelves%20for%20Personal%20and%20Professional%20Development.png?width=1600&name=21%20Books%20on%20Our%20Shelves%20for%20Personal%20and%20Professional%20Development.png" />

      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ book.TITLE }}
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          Escrito por {{ this.authorName }}
        </div>
        <div class="text-caption text-grey">
          Editora {{ this.editorName }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat color="primary" @click="onBorrow()">
          Fazer empréstimo
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { userStore } from 'src/stores/userStore';
import { Notify } from 'quasar';
import axios from 'axios';

  export default {
    name: 'BookCard',

    props: {
      book: {
        type: Object
      }
    },

    data() {
      return {
        authorName: '',
        editorName: ''
      }
    },

    mounted() {
      this.getAuthor(this.book.AUTHOR_ID);
      this.getEditor(this.book.EDITOR_ID);
    },

    methods: {
      onBorrow() {
        if (userStore.user) {
          axios.post(`http://localhost:3000/emprestimos`, {
            STATUS: "Em andamento",
            CLIENTE_ID: 1
          }, {
            headers: {
              Authorization: `Bearer ${userStore.jwt}`
            }
          })
          .then((response)=> {
            axios.post(`http://localhost:3000/emprestimos/itens`, {
              EMPRESTIMO_ID: response.data.id,
		          LIVRO_ID: this.book.ID
            }, {
              headers: {
                Authorization: `Bearer ${userStore.jwt}`
              }
            })
            .then((response) => console.log(response))
            .catch((erro) => console.log(erro))
          })
          .catch((erro) => console.log(erro))

        } else {
          Notify.create("É necessario estar logado para realizar essa ação!")
          this.$router.push("/login")
        }
      },
      getAuthor(id) {
        axios.get(`http://localhost:3000/autores/${id}`)
          .then((response) => {
            this.authorName = response.data.NAME;
          })
          .catch((error) => {
            console.log(error);
          })
      },
      getEditor(id) {
        axios.get(`http://localhost:3000/editoras/${id}`)
          .then((response) => {
            this.editorName = response.data.NAME;
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
  }
</script>

<style>
.my-card {
  width: 20vw;
}
</style>
