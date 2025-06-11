import axios from 'axios';
import { userStore } from 'src/stores/userStore';
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userStore.jwt}`
  }
})

export async function getLivrosEmprestados() {
  let books = []
  await api.get(`/clientes/email/${userStore.user}`)
      .then(async (res) => {
        await api.get(`/emprestimos/clientes/${res.data.ID}`)
        .then(async (res) => {
          for (var i = 0; i<res.data.length; i++) {
            await api.get(`/emprestimos/itens/${res.data[i].ID}`)
            .then(async (res) => {
              for (var i = 0; i<res.data.length; i++) {
                await api.get(`/livros/${res.data[i].LIVRO_ID}`)
                .then(async (res) => {
                  books.push(res.data)
                })
                .catch((err) => console.log(err))
              }
            })
            .catch((err) => console.log(err))
          }
        })
        .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  return books;
}

export async function getEmprestimoID(id) {
  let emprestimoId = null;
  await api.get(`/clientes/email/${userStore.user}`)
  .then(async (resCliente) => {
    await api.get(`/emprestimos/clientes/${resCliente.data.ID}`)
    .then(async (resEmprestimos) => {
      for (let i = 0; i < resEmprestimos.data.length; i++) {
        await api.get(`/emprestimos/itens/${resEmprestimos.data[i].ID}`)
        .then((resItens) => {
          for (let j = 0; j < resItens.data.length; j++) {
            if (resItens.data[j].LIVRO_ID === id) {
              emprestimoId = resEmprestimos.data[i].ID;
            }
          }
        })
        .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
  return emprestimoId;
}
