<script setup lang="ts">
import router from '../router';
</script>

<template>
  <header class="header">
    <h1>Rick and Motry</h1>
    <div class="search">
      <input type="text">
      <div class="button">Search</div>
    </div>
    <img @click="() => router.push('/')" alt="Rick and Morty" class="logo" src="/favicon96.png" />
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--header-background);
  border-bottom: 2px solid var(--header-border);
  padding: 0.2rem 0.5rem 0.2rem 0.5rem;
}

.search {
  display: flex;
  gap: 0.5rem;
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
  &:hover {
    filter: hue-rotate(180deg);
  }
}

.header {
  @media screen and (max-width: 600px) {
    padding: 0.3rem;

    h1 {
      font-size: 1rem;
    }

    .logo {
      width: 40px;
      height: 40px;
    }
  }

  @media screen and (max-width: 500px) {
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
