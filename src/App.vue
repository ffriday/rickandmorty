<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import HeaderVue from '@components/HeaderVue.vue';
import { ref } from 'vue';
import { api } from './main';
import { resolveParams } from './utils/resolveParams'
import type { Pages, Character } from './utils/types'

const route = useRoute()
const isLoading = ref(false)
const pages = ref<Pages>({ prev: false, next: false, current: 0 })
const characters = ref<Character[]>([])

const load = async () => {
  isLoading.value = true
  const response = await api.getCharacters(resolveParams(route))
  if (!response.error && response.data) {
    pages.value = {
      prev: Boolean(response.data.info.prev),
      next: Boolean(response.data.info.next),
      current: response.data.info.count
    }
    characters.value = response.data.results
    response.data.results
  } else {
    console.error(response.error)
  }
  isLoading.value = false
}
</script>

<template>
  <HeaderVue :isLoading="isLoading" @loading="load" />
  <RouterView :characters="characters" :pages="pages"/>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  font-style: normal;
  background-color: var(--header-background);
  border-bottom: 2px solid var(--header-border);
}

.logo {
  cursor: pointer;
}

.search {

  display: flex;

  h1 {
    @media screen and (max-width: 500px) {
      display: none;
    }

    @media screen and (max-width: 700px) {
      font-size: 1rem;
    }
  }
}
</style>
