<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'

import {useModalStore} from './stores/modal'
import {computed, defineAsyncComponent} from 'vue'

const modalStore = useModalStore()

const modalComponent = computed(() => {
  if(modalStore.component) {
    return defineAsyncComponent(() => import(`./components/modals/${modalStore.component}.vue`))
  } else {
    return ''
  }
})
</script>

<template>
    <HeaderComponent/>

    <RouterView />

    <component v-if="modalComponent" :is="modalComponent"/>
</template>

<style>
</style>