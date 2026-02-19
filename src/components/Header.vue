<script setup lang="ts">
import { useGameStore } from '@/store/gameStore';
const store = useGameStore();

function showWelcome() {
  store.toggleWelcome(false);
}
</script>

<template>
  <header class="flex justify-between items-center">
    <div>
      <div class="flex items-center gap-2 text-amber-400">
        <h1 class="text-2xl font-black uppercase tracking-tighter">Over Boiled</h1>
        <button @click="showWelcome"
          class="text-sm rounded-full border border-amber-400 h-5 w-5 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 cursor-pointer hover:bg-amber-900">?</button>
      </div>
      <span class="text-xs text-slate-500">Round: {{ store.round }}/8</span>
    </div>
  </header>
</template>