<script setup lang="ts">
import router from '@/router';
import type { Pages } from '@/utils/types';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const props = defineProps<{ pages: Pages }>()

const getCurrentPage = (): number => {
  const pageProp = Array.isArray(route.query.page) ? route.query.page[0] : route.query.page
  return isNaN(Number(pageProp)) ? 1 : Number(pageProp)
}

const currentPage = ref(getCurrentPage())

const setSeatchParams = (next: boolean) => {
  router.push({ query: { ...route.query, page: next ? currentPage.value + 1 : currentPage.value - 1 } })
}

watch(() => route.query.page, () => {
  currentPage.value = getCurrentPage()
})
</script>

<template>
  <footer class="footer">
    <button class="button" @click="setSeatchParams(false)" :disabled="!props.pages.prev">Previous</button>
    <span class="page">{{ currentPage }} from {{ props.pages.total }}</span>
    <button class="button" @click="setSeatchParams(true)" :disabled="!props.pages.next">Next</button>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 1.5rem;
  gap: 1rem;
  padding: 0.5rem 0 0.5rem 0;
}

.page {
  font-weight: 500;
}

.button {
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 0.2rem;
  background-color: var(--dark-blue);
  font-weight: 300;
  transition-duration: 2ms;
  min-width: 70px;
  text-align: center;
  border: 0;

  &:hover {
    filter: hue-rotate(180deg);
  }

  &:active {
    transform: scale(0.95);
    transition-duration: 2ms;
  }
}
</style>