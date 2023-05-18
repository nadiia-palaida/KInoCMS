<script setup>
import RadioComponent from '../form/RadioComponent.vue'
import InputComponent from '../form/InputComponent.vue'
import VueMultiselect from 'vue-multiselect'

import '../../plugins/vee-validate'

import cities from '../../data/cities.json'

import {computed, onMounted, ref} from 'vue'

import {SUPPORT_LOCALES} from '../../plugins/i18n'
import {useRoute} from 'vue-router'
import {useModalStore} from '../../stores/modal'

const modalStore = useModalStore()

const user = ref({
  firstName: '',
  lastName: '',
  nick: '',
  email: '',
  address: '',
  password: '',
  checkPassword: '',
  cardNumber: '',
  lang: '',
  gender: '',
  phone: '',
  birthDate: '',
  city: '',
})

const languagesOptionsList = [
  {
    label: 'Українська',
    value: 'ua'
  },
  {
    label: 'Російська',
    value: 'ru'
  },
]

const genderOptionsList = [
  {
    label: 'Чоловіча',
    value: 'male'
  },
  {
    label: 'Жіноча',
    value: 'female'
  },
]

const route = useRoute()

console.log('route.params.locale', route.params.locale)

const activeLang = computed(() => {
  if (route.params.locale === 'ua') {
    return 'uk'
  } else {
    return route.params.locale
  }
})


const citiesOptionsList = cities.map(item => {
  return {
    label: item.name[activeLang.value],
    value: item.name
  }
})

onMounted(() => {
  user.value.lang = languagesOptionsList[0].value
  user.value.gender = genderOptionsList[0].value
})

</script>
<template>
  <div class="modal modal-xl" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Реєстрація</h5>
          <button @click="modalStore.closeModal" type="button" class="close btn border" data-dismiss="modal"
                  aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6">
              <InputComponent v-model="user.firstName" name="user-first-name" label="Ім'я"
                              rules="required" class="mb-4"/>
              <InputComponent v-model="user.lastName" name="user-last-name" label="Прізвище"
                              rules="required" class="mb-4"/>
              <InputComponent v-model="user.nick" name="user-nick" label="Псевдонім"
                              rules="required" class="mb-4"/>
              <InputComponent v-model="user.email" name="user-email" label="E-mail"
                              rules="required|email" class="mb-4"/>
              <InputComponent v-model="user.address" name="user-address" label="Адреса"
                              rules="required" class="mb-4"/>
              <InputComponent v-model="user.cardNumber" name="user-card-number" label="Номер карти"
                              rules="required|digits:16" class="mb-4"/>
            </div>

            <div class="col-6">
              <RadioComponent v-model="user.lang" :options="languagesOptionsList" name="user-lang" label="Мова"
                              class="mb-3"/>
              <RadioComponent v-model="user.gender" :options="genderOptionsList" name="user-gender" label="Стать"
                              class="mb-3"/>
              <InputComponent v-model="user.phone" name="user-phone" label="Телефон"
                              rules="required|digits:10" class="mb-4"/>
              <InputComponent v-model="user.birthDate" name="user-birthday" label="Дата народження" type="date"
                              rules="required" class="mb-4"/>

              <div class="d-flex align-items-center mb-4">
                <div class="multi-select-label">Місто</div>
                <VueMultiselect v-model="user.city" :options="citiesOptionsList" label="label" :preserve-search="true"
                                track-by="value"/>
              </div>

              <InputComponent v-model="user.password" name="user-password" label="Пароль" type="password"
                              rules="required" class="mb-4"/>
              <InputComponent v-model="user.checkPassword" name="user-check-password" label="Повторити пароль"
                              type="password"
                              rules="required" class="mb-4"/>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-primary">Зберегти</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.modal {
  display: block !important;
}

.multi-select-label {
  margin-right: 10px;
}
</style>
