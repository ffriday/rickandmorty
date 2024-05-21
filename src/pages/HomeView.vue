<script setup lang="ts">
import CharacterCard from '@/components/CharacterCard.vue';
import type { Character } from '@/utils/types';
const props = defineProps<{ characters: Character[], error: string | undefined }>()
</script>

<template>
  <main class="charcter-container">
    <p v-if="props.error">{{ props.error }}</p>
    <CharacterCard v-else v-for="character in props.characters" :key="character.id" :character="character" />
  </main>
</template>

<style scoped>
.charcter-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--caracter-card-size), 1fr));
  gap: 1rem;
  padding: 0 0.5rem 0 0.5rem;
}

p {
  text-align: center;
}
</style>
