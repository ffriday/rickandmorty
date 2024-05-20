<script setup lang="ts">
import type { Character, Pages } from '@/utils/types';
const props = defineProps<{pages: Pages, characters: Character[]}>()
</script>

<template>
  <main>
    {{ pages }}
    {{ characters }}
  </main>
</template>
