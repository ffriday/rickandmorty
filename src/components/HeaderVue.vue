<script setup lang="ts">
import { ref, watch } from 'vue';
import router from '../router';
import { useRoute, useRouter } from 'vue-router';
import { resolveParam } from '@/utils/resolveParams';

const statuses = [{ All: '' }, { Alive: 'alive' }, { Dead: 'dead' }, { Unknown: 'unknown' }]
const props = defineProps<{ isLoading: boolean }>()
const route = useRoute()
const vueRouter = useRouter()
const name = ref('');
const status = ref('');

watch(() => [route.query.name, route.query.status], async () => {
  await vueRouter.isReady()
  name.value = resolveParam(route.query.name)
  status.value = resolveParam(route.query.status)
})

const setSeatchParams = (home: boolean = false) => {
  if (home) {
    router.push({ path: '/', query: { name: '', status: '', page: 0 } })
  } else {
    router.push({ query: { name: name.value, status: status.value, page: 0 } })
  }
}
</script>

<template>
  <header class="header">
    <h1>Rick and Motry</h1>
    <div class="filter">
      <div class="filter_container">
        <input type="text" placeholder="Name" v-model="name" @keypress.enter="() => setSeatchParams()">
        <select name="status" placeholder="Status" v-model="status">
          <option v-for="value in statuses" :value="Object.values(value)[0]" :key="Object.keys(value)[0]"
            :selected="status === Object.values(value)[0]">
            {{ Object.keys(value)[0] }}
          </option>
        </select>
      </div>
      <div :class="{ disabled: props.isLoading, button: true }" @click="() => setSeatchParams()">{{ props.isLoading ?
          'Loading'
          : 'Filter'
        }}</div>
    </div>
    <img @click="() => setSeatchParams(true)" alt="Rick and Morty" class="logo" src="/favicon96.png" />
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--header-background);
  border-bottom: 2px solid var(--header-border);
  padding: 0.2rem 0.5rem 0.2rem 0.5rem;
}

.filter,
.filter_container {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

.filter_container {
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
}

h1 {
  margin: 0;
}

.logo {
  cursor: pointer;
  width: 50px;
  height: 50px;
}

.button {
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 0.2rem;
  background-color: var(--dark-blue);
  font-weight: 300;
  transition-duration: 2ms;
  max-height: 1.2rem;
  min-width: 70px;
  text-align: center;

  &:hover {
    filter: hue-rotate(180deg);
  }

  &:active {
    transform: scale(0.95);
    transition-duration: 2ms;
  }
}

.header {
  @media screen and (max-width: 820px) {
    padding: 0.3rem;

    h1 {
      font-size: 1rem;
    }

    .logo {
      width: 40px;
      height: 40px;
    }
  }

  @media screen and (max-width: 670px) {
    padding: 0.1rem;

    h1 {
      display: none;
    }

    .logo {
      width: 25px;
      height: 25px;
    }
  }
}

.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
