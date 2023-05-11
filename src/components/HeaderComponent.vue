<script setup>
import {useModalStore} from '../stores/modal'
import {useGeneralStore} from '../stores/general'

const modalStore = useModalStore()
const generalStore = useGeneralStore()
</script>

<template>
  <header>
    <div class="wrapper">
      <button @click="modalStore.openModal({component: 'RegisterModal'})" class="btn btn-info">{{ $t('message.register') }}
      </button>
    </div>
  </header>
</template>
