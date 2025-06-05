import axios from 'axios';
import { Notify } from 'quasar';
import { userStore } from 'src/stores/userStore';
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json"
  }
})

export function loginUser(user, router) {
  api.post('/users/login', user)
    .then((response) => {
      userStore.setUser(user.email, response.data)
      Notify.create("Login realizado com sucesso!");
      router.push('/');
    })
    .catch((err) => {
      alert('Erro, ' + err.message)
    })
}

export function registerUser(user, router) {
  api.post('/users', user)
    .then(() => {
      Notify.create("Registrado com sucesso! Agora, faça o login");
      router.push('/login');
    })
    .catch((err) => {
      alert('Erro, ' + err.message)
    })
}

export function logoutUser(router) {
  userStore.removeUser();
  Notify.create("Você saiu da sua conta.");
  router.push('/');
}
