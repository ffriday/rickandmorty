<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';

defineEmits(['loading'])
const props = defineProps(['isLoading'])
const name = ref('');
const status = ref('');
</script>

<template>
  <header class="header">
    <h1>Rick and Motry</h1>
    <div class="filter">
      <div class="filter_container">
        <input type="text" placeholder="Name" v-model="name">
        <input type="text" placeholder="Status" v-model="status">
      </div>
      <div :class="{ disabled: isLoading, button: true }" @click="$emit('loading')"
        :aria-disabled="props.isLoading">{{ isLoading ? 'Loading' : 'Filter' }}</div>
    </div>
    <img @click="() => router.push('/')" alt="Rick and Morty" class="logo" src="/favicon96.png" />
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
</style>
