<template>
  <div class="q-pa-lg">
    <div class="q-gutter-md q-mb-md profile-header">
      <div class="profile-header-left">
        <q-avatar size="56px" color="primary" text-color="white">
          <q-icon name="person" />
        </q-avatar>
        <div>
          <div class="text-h5">{{ client.FIRST_NAME }} {{ client.LAST_NAME }}</div>
          <div class="text-subtitle2 text-grey">Cliente N° {{ client.ID }}</div>
        </div>
      </div>
      <q-btn @click="this.$router.push('/logout')" flat color="red" icon="logout" label="SAIR DA CONTA" />
    </div>
    <q-list bordered class="rounded-borders bg-white">
      <q-item>
        <q-item-section avatar><q-icon name="email" /></q-item-section>
        <q-item-section>
          <q-item-label>Email</q-item-label>
          <q-item-label caption>{{ client.EMAIL }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator/>
      <q-item>
        <q-item-section avatar><q-icon name="phone" /></q-item-section>
        <q-item-section>
          <q-item-label>Celular</q-item-label>
          <q-item-label caption>{{ tempPhone }}</q-item-label>
          <q-input v-if="phoneEdit" v-model="phoneField" label="Novo celular"></q-input>
        </q-item-section>
        <div class="editing" v-if="phoneEdit">
          <q-item-section ><q-btn title="Salvar" class="save-btn" flat round icon="save" @click="editPhone()"/></q-item-section>
          <q-item-section ><q-btn title="Cancelar" class="cancel-btn" flat round icon="cancel" @click="phoneEdit = false" /></q-item-section>
        </div>
          <q-item-section v-else avatar><q-btn flat round icon="edit" @click="phoneEdit = true" /></q-item-section>
      </q-item>
      <q-separator/>
      <q-item>
        <q-item-section avatar><q-icon name="home" /></q-item-section>
        <q-item-section>
          <q-item-label>Endereço</q-item-label>
          <q-item-label caption>{{ tempAddress }}</q-item-label>
        <q-input v-if="addressEdit" v-model="addressField" label="Novo endereço"></q-input>
        </q-item-section>
        <div class="editing" v-if="addressEdit">
          <q-item-section ><q-btn title="Salvar" class="save-btn" flat round icon="save" @click="editAddress()"/></q-item-section>
          <q-item-section ><q-btn title="Cancelar" class="cancel-btn" flat round icon="cancel" @click="addressEdit = false" /></q-item-section>
        </div>
          <q-item-section v-else avatar><q-btn flat round icon="edit" @click="addressEdit = true" /></q-item-section>
      </q-item>
      <q-separator/>
      <q-item>
        <q-item-section avatar><q-icon name="wc" /></q-item-section>
        <q-item-section>
          <q-item-label>Gênero</q-item-label>
          <q-item-label caption>{{ tempGender }}</q-item-label>
        <q-select :options="['Masculino', 'Feminino', 'Outro']" v-if="genderEdit" v-model="genderField" label="Novo gênero"></q-select>
        </q-item-section>
        <div class="editing" v-if="genderEdit">
          <q-item-section ><q-btn title="Salvar" class="save-btn" flat round icon="save" @click="editGender()"/></q-item-section>
          <q-item-section ><q-btn title="Cancelar" class="cancel-btn" flat round icon="cancel" @click="genderEdit = false" /></q-item-section>
        </div>
          <q-item-section v-else avatar><q-btn flat round icon="edit" @click="genderEdit = true" /></q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import axios from 'axios'
import { Notify } from 'quasar';
import { userStore } from 'src/stores/userStore';
export default {
  name: 'ClientCard',

  props: {
    client: {
      type: Object
    }
  },

  data() {
    return {
      phoneEdit: false,
      addressEdit: false,
      genderEdit: false,
      phoneField: '',
      addressField: '',
      genderField: '',
      tempPhone: '',
      tempAddress: '',
      tempGender: '',
    }
  },

  watch: {
    client: {
      immediate: true,
      handler(newClient) {
        if (newClient) {
          this.tempPhone = newClient.CELL_PHONE;
          this.tempAddress = newClient.ADDRESS;
          this.tempGender = newClient.GENDER == 'M' ? 'Masculino' : newClient.GENDER == 'F' ? 'Feminino' : newClient.GENDER == 'O' ? 'Outro' : newClient.GENDER;
        }
      }
    }
  },

  methods: {
    editPhone() {
      if (this.phoneField == '') {
        Notify.create("Campo de edição precisa ter algo escrito!")
      } else {
        axios.patch(`http://localhost:3000/clientes/${this.client.ID}`, {
          field: 'CELL_PHONE',
          value: this.phoneField
        }, {
          headers: { Authorization: `Bearer ${userStore.jwt}` }
        })
        .then((res) => {
          console.log(res)
          this.tempPhone = this.phoneField
          this.phoneEdit = false
          this.phoneField = '';
          Notify.create("Celular alterado com sucesso!")
        })
        .catch((err) => console.log(err))
      }
    },

    editAddress() {
      if (this.addressField == '') {
        Notify.create("Campo de edição precisa ter algo escrito!")
      } else {
        axios.patch(`http://localhost:3000/clientes/${this.client.ID}`, {
          field: 'ADDRESS',
          value: this.addressField
        }, {
          headers: { Authorization: `Bearer ${userStore.jwt}` }
        })
        .then((res) => {
          console.log(res)
          this.tempAddress = this.addressField
          this.addressEdit = false
          this.addressField = '';
          Notify.create("Endereço alterado com sucesso!")
        })
        .catch((err) => console.log(err))
      }
    },

    editGender() {
      if (this.genderField == '') {
        Notify.create("Campo de edição precisa ter algo selecionado!")
      } else {
        axios.patch(`http://localhost:3000/clientes/${this.client.ID}`, {
          field: 'GENDER',
          value: this.genderField == 'Masculino' ? 'M' : this.genderField == 'Feminino' ? 'F' : this.genderField == 'Outro' ? 'O' : this.genderField
        }, {
          headers: { Authorization: `Bearer ${userStore.jwt}` }
        })
        .then((res) => {
          console.log(res)
          this.tempGender = this.genderField
          this.genderEdit = false
          this.genderField = '';
          Notify.create("Gênero alterado com sucesso!")
        })
        .catch((err) => console.log(err))
      }
    },
  }
}
</script>

<style>
.profile-header {
  display: flex;
  justify-content: space-between;
}

.profile-header-left {
  display: flex;
  gap: 16px;
}

.editing {
  display: flex;
}

.save-btn:hover {
  transition: .2s;
  transform: scale(1.1);
  color: green;
}

.cancel-btn:hover {
  transition: .2s;
  transform: scale(1.1);
  color: red;
}
</style>
