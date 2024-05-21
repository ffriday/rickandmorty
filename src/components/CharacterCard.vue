<script setup lang="ts">
import type { Character } from '@/utils/types';
const props = defineProps<{ character: Character }>()
</script>

<template>
  <div class="card">
    <img class="image" :src="props.character.image" :alt="props.character.name" />
    <div class="info">
      <h3>{{ props.character.name }}</h3>
      <p :class="{ status: true, link: true, alive: props.character.status === 'Alive', dead: props.character.status === 'Dead' || props.character.status === 'unknown' }">
        Status: {{ props.character.status }}</p>
      <h5>Last known location:</h5>
      <p class="link">{{ props.character.location.name }}</p>
      <h5>First seen in:</h5>
      <p class="link">{{ props.character.origin.name }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  min-width: var(--caracter-card-size);
  background-color: var(--character-card-background);

  &:hover {
    transform: scale(1.005);
    transition-duration: 10ms;
  }
}

.card,
.image {
  border-radius: var(--image-border-radius);
}

.image {
  width: var(--image-size);
  height: var(--image-size);
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-start;
  justify-content: flex-start;

  * {
    margin: 0;
  }
}

.status::before {
  content: "";
  display: inline-block;
  margin-right: 0.5rem;
  min-width: 10px;
  min-height: 10px;
  border-radius: 50%;
}

.status.dead::before {
  background-color: var(--status-dead);
}

.status.alive::before {
  background-color: var(--status-alive);
}

.link:hover {
  color: var(--link-active);
  cursor: pointer;
}
</style>