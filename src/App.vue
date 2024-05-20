<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderVue from '@components/HeaderVue.vue';
</script>

<template>
  <HeaderVue />
  <RouterView />
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
