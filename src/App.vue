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
const pages = ref<Pages>({ prev: false, next: false, total: 0 })
const characters = ref<Character[]>([])

const load = async () => {
  isLoading.value = true
  const response = await api.getCharacters(resolveParams(route))
  if (!response.error && response.data) {
    pages.value = {
      prev: Boolean(response.data.info.prev),
      next: Boolean(response.data.info.next),
      total: response.data.info.count
    }
    characters.value = response.data.results
    response.data.results
  } else {
    console.error(response.error)
  }
  isLoading.value = false
}

watch(() => [route.query.name, route.query.status, route.query.page], () => {
  load()
})
</script>

<template>
  <HeaderVue :isLoading="isLoading" />
  <RouterView :characters="characters" :pages="pages" />
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
