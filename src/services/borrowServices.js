import axios from 'axios';
import { userStore } from 'src/stores/userStore';
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userStore.jwt}`
  }
})

export async function getEmprestimosService() {
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

export async function isBookBorrowed(id) {
  let found = false;
    await axios.get(`http://localhost:3000/clientes/email/${userStore.user}`, {
    headers: { Authorization: `Bearer ${userStore.jwt}` }
    })
    .then(async (res) => {
      await axios.get(`http://localhost:3000/emprestimos/clientes/${res.data.ID}`, {
        headers: { Authorization: `Bearer ${userStore.jwt}` }
      })
      .then(async (res) => {
        for (var i = 0; i<res.data.length; i++) {
          await axios.get(`http://localhost:3000/emprestimos/itens/${res.data[i].ID}`, {
            headers: { Authorization: `Bearer ${userStore.jwt}` }
          })
          .then(async (res) => {
            for (var i = 0; i<res.data.length; i++) {
              await axios.get(`http://localhost:3000/livros/${res.data[i].LIVRO_ID}`, {
                headers: { Authorization: `Bearer ${userStore.jwt}` }
              })
              .then((res) => {
                if (res.data.ID == id) {
                  found = true
                }
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
  return found
}
