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
      Notify.create("Entrou com sucesso!");
      router.push('/');
    })
    .catch((err) => {
      alert('Erro, ' + err.message)
    })
}

export async function registerUser(user, router) {
  try {
    await api.post('/users', { email: user.OCI.EMAIL, password: user.password });

    const response = await api.post('/users/login', { email: user.OCI.EMAIL, password: user.password });
    userStore.setUser(user.OCI.EMAIL, response.data);
    Notify.create("Entrou com sucesso!");

    await api.post('/clientes', user.OCI, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    });

    router.push('/');
  } catch (err) {
    alert('Erro, ' + err.message);
  }
}

export function logoutUser(router) {
  userStore.removeUser();
  Notify.create("Você saiu da sua conta.");
  router.push('/');
}
