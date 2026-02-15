<script setup lang="ts">
import { useGameStore } from '@/store/gameStore';
import { computed } from 'vue';
const store = useGameStore();

const danger = computed(() => {
  if (store.bag.length === 0) return false;
  // highest white chip value in the bag
  const maxWhite = Math.max(...store.bag.filter(c => c.color === 'white').map(c => c.value));
  return maxWhite + store.whiteSum > 7
})

const warningStyle = computed(() => {
  if (store.isExploded) {
    return 'bg-red-600 border-red-400 animate-pulse';
  } else if (danger.value && !store.isExploded) {
    return 'border-orange-400';
  } else {
    return 'bg-slate-800 border-slate-700';
  }
})
</script>

<template>
  <header class="flex justify-between items-center">
    <div>
      <h1 class="text-2xl font-black text-amber-400 uppercase tracking-tighter">Over Boiled</h1>
      <span class="text-xs text-slate-500">Round: {{ store.round }}/8</span>
    </div>

    <div :class="[
      'px-4 py-2 rounded-lg border-2 font-mono font-bold transition-all duration-500',
      warningStyle
    ]">
      {{ store.whiteSum }} / 7
    </div>
  </header>
</template>