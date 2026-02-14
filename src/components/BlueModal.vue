<script setup lang="ts">
import { useGameStore } from '@/store/gameStore';
import Chip from '@/components/Chip.vue';

const store = useGameStore()
</script>

<template>
  <div v-if="store.draftOptions.length > 0" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <div class="bg-slate-900 p-6 rounded-3xl border-2 border-blue-500 text-center">
      <h2 class="text-blue-400 font-bold mb-4 uppercase">Blue Vision</h2>
      <p class="text-slate-300 mb-4">Select a chip to place</p>
      <div class="flex gap-4 mb-6">
        <div v-for="(chip, i) in store.draftOptions" :key="i" class="flex flex-col gap-2">
          <Chip :chip="chip" @click="store.selectBlueOption(i)" class="cursor-pointer hover:scale-110" />
        </div>
      </div>
      <button @click="store.selectBlueOption(null)" class="w-full py-3 bg-amber-500 text-slate-900 rounded-2xl font-black text-base shadow-[0_6px_0_0_#b45309] active:translate-y-1 active:shadow-none transition-all uppercase tracking-tight">Choose None</button>
    </div>
  </div>
</template>