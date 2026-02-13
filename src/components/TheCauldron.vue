<script setup lang="ts">
import { useGameStore } from '@/store/gameStore';
import Chip from '@/components/Chip.vue';

const store = useGameStore()
</script>

<template>
  <main
    class="max-w-md mx-auto relative h-64 w-full bg-slate-800 rounded-3xl border-4 border-slate-700 shadow-2xl overflow-hidden flex flex-wrap content-start p-6 gap-3">
    <TransitionGroup name="list">
      <Chip v-for="chip in store.pot" :chip="chip" :key="chip.id"/>
    </TransitionGroup>
    <div v-if="store.pot.length === 0" class="absolute inset-0 flex items-center justify-center text-slate-500 italic">
      The cauldron is empty...
    </div>
  </main>
</template>