<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-img src="https://uyc.thecenterforsalesstrategy.com/hs-fs/hubfs/21%20Books%20on%20Our%20Shelves%20for%20Personal%20and%20Professional%20Development.png?width=1600&name=21%20Books%20on%20Our%20Shelves%20for%20Personal%20and%20Professional%20Development.png" />

      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ book.TITLE }}
          </div>
          <div class="row no-wrap items-center">
            <span class="ellipsis">
              {{ categorias.join(' | ') }}
            </span>
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
        <div v-if="emprestado != null">
          <q-btn flat style="color: green;" v-if="emprestado == true" @click="onReturn">
            Devolver
          </q-btn>
          <q-btn flat color="primary" @click="onBorrow()" v-else>
            Fazer empréstimo
          </q-btn>
        </div>
        <div v-else>
          <q-skeleton type="text" width="120px" height="36px"/>
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { userStore } from 'src/stores/userStore';
import { Notify } from 'quasar';
import axios from 'axios';
import { getEmprestimoID } from 'src/services/borrowServices.js'

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
        editorName: '',
        categorias: [],
        emprestado: null,
        emprestimoID: null
      }
    },

    mounted() {
      this.getAuthor(this.book.AUTHOR_ID);
      this.getEditor(this.book.EDITOR_ID);
      this.getCategorias(this.book.ID);
      this.getEmprestimoState()
    },

    methods: {
  onBorrow() {
    if (userStore.user) {
      axios.get(`http://localhost:3000/clientes/email/${userStore.user}`, {
        headers: {
          Authorization: `Bearer ${userStore.jwt}`
        }
      })
      .then((res) => {
        axios.post(`http://localhost:3000/emprestimos`, {
          STATUS: "Em andamento",
          CLIENTE_ID: res.data.ID
        }, {
          headers: {
            Authorization: `Bearer ${userStore.jwt}`
          }
        })
        .then((respo) => {
          axios.post(`http://localhost:3000/emprestimos/itens`, {
            EMPRESTIMO_ID: respo.data.id,
            LIVRO_ID: this.book.ID
          }, {
            headers: {
              Authorization: `Bearer ${userStore.jwt}`
            }
          })
          .then((response) => {
            console.log(response);
            Notify.create("Empréstimo realizado com sucesso!");
            this.emprestado = true;
            this.emprestimoID = respo.data.id;
          })
          .catch((erro) => console.log(erro))
        })
        .catch((erro) => console.log(erro))
      })
    } else {
      Notify.create("É necessário estar logado para realizar essa ação!");
      this.$router.push("/login");
    }
  },

  onReturn() {
    axios.delete(`http://localhost:3000/emprestimos/${this.emprestimoID}`, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    })
    .then(() => {
      Notify.create("Livro devolvido com sucesso!");
      this.emprestado = false;
      this.emprestimoId = null;
    })
    .catch((error) => {
      console.log(error);
      Notify.create("Erro ao tentar devolver o livro.");
    });
  },

  getAuthor(id) {
    axios.get(`http://localhost:3000/autores/${id}`)
      .then((response) => {
        this.authorName = response.data.NAME;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getEditor(id) {
    axios.get(`http://localhost:3000/editoras/${id}`)
      .then((response) => {
        this.editorName = response.data.NAME;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getCategorias(id) {
    axios.get(`http://localhost:3000/livros/${id}/categorias`)
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          axios.get(`http://localhost:3000/categorias/${response.data[i].CATEGORY_ID}`)
            .then((response) => this.categorias.push(response.data.NAME))
            .catch((erro) => console.log(erro));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async getEmprestimoState() {
    let emprestimo_id = await getEmprestimoID(this.book.ID);
    if (emprestimo_id) {
      this.emprestado = true;
      this.emprestimoID = emprestimo_id
    } else {
      this.emprestado = false;
    }
  },
}

  }
</script>

<style>
.my-card {
  width: 20vw;
}
</style>
