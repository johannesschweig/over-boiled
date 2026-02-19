<script setup lang="ts">
import { useGameStore } from '@/store/gameStore';
import Chip from '@/components/Chip.vue';
import { computed } from 'vue';

const store = useGameStore()

const warningStyle = computed(() => {
  if (store.isExploded) {
    return 'bg-red-600 border-2 border-red-400 animate-pulse';
  } else if (store.danger && !store.isExploded) {
    return 'bg-orange-400';
  } else {
    return 'bg-slate-700';
  }
})
</script>

<template>
  <main class="max-w-md mx-auto relative h-64 w-full bg-slate-800 rounded-3xl border-2 border-slate-700 shadow-2xl">
    <div class="flex justify-between mt-3 mx-3 items-center">
      <div class="heading-caps">Pot</div>
      <div v-if="store.whiteSum" :class="[
        'px-2 py-1 rounded-lg  font-mono text-xs font-bold transition-all duration-500',
        warningStyle
      ]">
        {{ store.whiteSum }} / 7
      </div>
    </div>
    <div class="overflow-hidden flex flex-wrap content-start p-4 gap-3">
      <TransitionGroup name="list" class="">
        <Chip v-for="chip in store.pot" :chip="chip" :key="chip.id" />
      </TransitionGroup>
    </div>
    <div v-if="store.pot.length === 0" class="absolute inset-0 flex items-center justify-center text-slate-500 italic">
      The pot is empty...
    </div>
  </main>
</template>