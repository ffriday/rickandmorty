<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import HeaderVue from '@components/HeaderVue.vue';
import PaginationVue from '@components/PaginationVue.vue';
import { ref, watch } from 'vue';
import { api } from './main';
import { resolveParams } from './utils/resolveParams'
import type { Pages, Character } from './utils/types'

const route = useRoute()
const isLoading = ref(false)
const error = ref('')
const initialPages = { prev: false, next: false, total: 0 }
const pages = ref<Pages>(initialPages)
const characters = ref<Character[]>([])

const load = async () => {
  isLoading.value = true
  const response = await api.getCharacters(resolveParams(route))
  if (!response.error && response.data) {
    pages.value = {
      prev: Boolean(response.data.info.prev),
      next: Boolean(response.data.info.next),
      total: response.data.info.pages
    }
    characters.value = response.data.results
    error.value = ''
    response.data.results
  }
  if (response.error) {
    error.value = response.error
    pages.value = initialPages
  }
  isLoading.value = false
}

watch(() => [route.query.name, route.query.status, route.query.page], () => {
  load()
})
</script>

<template>
  <HeaderVue :isLoading="isLoading" />
  <RouterView :characters="characters" :error="error" />
  <PaginationVue :pages="pages" />
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
