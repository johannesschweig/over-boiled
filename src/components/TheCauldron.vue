<script setup lang="ts">
import type { Chip } from '../composables/useGame'
defineProps<{ chips: Chip[] }>()
</script>

<template>
  <main class="max-w-md mx-auto relative h-80 w-full bg-slate-800 rounded-3xl border-4 border-slate-700 shadow-2xl overflow-hidden flex flex-wrap content-start p-6 gap-3">
    <TransitionGroup name="list">
      <div v-for="chip in chips" :key="chip.id" :class="[
        'w-12 h-12 rounded-full flex items-center justify-center text-xl font-black shadow-lg border-b-4',
        chip.color === 'white' ? 'bg-white text-slate-900 border-slate-300' : 'text-white border-black/20',
        chip.color === 'orange' ? 'bg-orange-500' : '',
        chip.color === 'green' ? 'bg-emerald-500' : '',
      ]">
        {{ chip.value }}
      </div>
    </TransitionGroup>
    <div v-if="chips.length === 0" class="absolute inset-0 flex items-center justify-center text-slate-500 italic">
      The cauldron is empty...
    </div>
  </main>
</template>