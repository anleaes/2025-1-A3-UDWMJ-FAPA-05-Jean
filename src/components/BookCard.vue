<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-img src="https://cnm.org.br/cms/images/stories/comunicacao_novo/educacao/05012016_livros_MRE.jpg" />

      <q-card-section>
        <div class="row no-wrap items-center">
          <div :title="book.TITLE" class="col text-h6 ellipsis">
            {{ book.TITLE }}
          </div>
          <div class="row no-wrap items-center">
            <span class="ellipsis" v-if="categorias.length > 0">
              {{ categorias.join(' | ') }}
            </span>
            <span class="ellipsis" v-else>
              <q-skeleton type="text" class="text-h6" width="120px"/>
            </span>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          Escrito por
            <span class="subtitle-author" @click="this.$router.push(`/autor/${this.book.AUTHOR_ID}`)">
              {{ this.authorName }}
            </span>
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
          <q-btn flat color="primary" @click="onBorrow" v-else>
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
import { Notify, useQuasar } from 'quasar';
import axios from 'axios';
import { getEmprestimoID, addEmprestimo } from 'src/services/borrowServices.js'

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

    setup() {
      const $q = useQuasar();
      function confirmBorrow() {
        return new Promise((res, rej) => {
          $q.dialog({
            title: 'Empréstimo',
            message: 'Deseja realizar um empréstimo deste livro?',
            cancel: true,
            persistent: true
          }).onOk(() => {
            res();
          }).onCancel(() => {
            rej();
          })
        })
      }

      function confirmReturn() {
        return new Promise((res, rej) => {
          $q.dialog({
            title: 'Devolver',
            message: 'Deseja retornar este livro?',
            cancel: true,
            persistent: true
          }).onOk(() => {
            res();
          }).onCancel(() => {
            rej();
          })
        })
      }

      return { confirmBorrow, confirmReturn }
    },

    methods: {
    async onBorrow() {
      this.confirmBorrow()
      .then(async ()=> {
        if (userStore.user) {
          let emprestimo_id = await addEmprestimo(this.book.ID)
          if (emprestimo_id) {
            Notify.create('Empréstimo realizado com sucesso!')
            this.emprestado = true;
            this.emprestimoID = emprestimo_id
          } else {
            this.emprestado = false;
          }
        } else {
          Notify.create("É necessário estar logado para realizar essa ação!");
          this.$router.push("/login");
        }
      })
      .catch(()=> {
        console.log("Empréstimo cancelado!");
      })
    },

    onReturn() {
      this.confirmReturn()
      .then(()=> {
        axios.delete(`http://localhost:3000/emprestimos/${this.emprestimoID}`, {
          headers: {
            Authorization: `Bearer ${userStore.jwt}`
          }
        })
        .then(() => {
          Notify.create("Livro devolvido com sucesso!");
          this.emprestado = false;
          this.emprestimoID = null;
        })
        .catch((error) => {
          console.log(error);
          Notify.create("Erro ao tentar devolver o livro.");
        });
      })
      .catch(()=> {
        console.log("Retorno cancelado!");
      })

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

    async getCategorias(id) {
      let tempCategorias = [];
      await axios.get(`http://localhost:3000/livros/${id}/categorias`)
        .then(async (response) => {
          for (var i = 0; i < response.data.length; i++) {
            await axios.get(`http://localhost:3000/categorias/${response.data[i].CATEGORY_ID}`)
              .then(async (response) => await tempCategorias.push(response.data.NAME))
              .catch((erro) => console.log(erro));
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.categorias = tempCategorias;
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
.subtitle-author {
  color: var(--q-primary);
  cursor: pointer;
}

.subtitle-author:hover {
  text-decoration: underline;
}
</style>
