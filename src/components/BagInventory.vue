<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ChipColor } from '@/constants'
import { useGameStore } from '@/store/gameStore'
import Chip from '@/components/Chip.vue';

const store = useGameStore()
const isOpen = ref(false)

// Group chips from masterChips only
const groupedChips = computed(() => {
  const groups: Record<string, { color: ChipColor; value: number; count: number }> = {}
  
  store.masterInventory.forEach(chip => {
    const key = `${chip.color}-${chip.value}`
    if (!groups[key]) {
      groups[key] = { color: chip.color, value: chip.value, count: 0 }
    }
    groups[key].count++
  })
  
  return Object.values(groups).sort((a, b) => a.color.localeCompare(b.color) || b.value - a.value)
})
</script>

<template>
  <div class="fixed top-0 right-0 h-full transition-transform duration-300 z-40 flex"
    :class="isOpen ? 'translate-x-0' : 'translate-x-[calc(100%-40px)]'">
    
    <button @click="isOpen = !isOpen"
      class="w-10 h-50 bg-slate-800 border-l border-y border-slate-700 rounded-l-2xl self-center flex items-center justify-center text-amber-400 hover:text-white transition-colors shadow-xl">
      <span class="rotate-90 font-bold tracking-widest text-xs uppercase whitespace-nowrap">
        {{ isOpen ? 'Close' : 'My Collection' }}
      </span>
    </button>

    <div class="w-64 bg-slate-800 border-l border-slate-700 shadow-2xl p-6 overflow-y-auto">
      <h2 class="text-xl font-black text-amber-400 mb-6 uppercase tracking-tight">
        Total Inventory
      </h2>

      <div v-if="store.masterInventory.length === 0" class="text-slate-500 italic">
        Inventory is empty!
      </div>

      <div class="space-y-3">
        <div v-for="group in groupedChips" :key="`${group.color}-${group.value}`"
          class="flex items-center justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-700">
          <div class="flex items-center gap-3">
            <Chip :chip="group" size="sm"/>
            <span class="capitalize text-sm font-medium text-slate-300">{{ group.color }}</span>
          </div>
          <span class="bg-slate-700 px-2 py-1 rounded text-xs font-mono text-amber-400">
            x{{ group.count }}
          </span>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-slate-700 text-xs text-slate-500 font-bold">
        <p>Total Chips in Bag: {{ store.masterInventory.length }}</p>
      </div>
    </div>
  </div>
</template>