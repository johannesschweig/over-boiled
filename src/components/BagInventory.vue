<script setup lang="ts">
import { ref, computed } from 'vue'

interface Chip {
  id: string
  color: string
  value: number
}

const props = defineProps<{
  chips: Chip[]
}>()

const isOpen = ref(false)

// Group chips to show "White (1) x 4" instead of listing all 4 individually
const groupedChips = computed(() => {
  const groups: Record<string, { color: string; value: number; count: number }> = {}
  
  props.chips.forEach(chip => {
    const key = `${chip.color}-${chip.value}`
    if (!groups[key]) {
      groups[key] = { color: chip.color, value: chip.value, count: 0 }
    }
    groups[key].count++
  })
  
  // Sort by color then value
  return Object.values(groups).sort((a, b) => a.color.localeCompare(b.color) || b.value - a.value)
})
</script>

<template>
  <div 
    class="fixed top-0 right-0 h-full transition-transform duration-300 z-40 flex"
    :class="isOpen ? 'translate-x-0' : 'translate-x-[calc(100%-40px)]'"
  >
    <button 
      @click="isOpen = !isOpen"
      class="w-10 h-50 bg-slate-800 border-l border-y border-slate-700 rounded-l-2xl self-center flex items-center justify-center text-amber-400 hover:text-white transition-colors shadow-xl"
    >
      <span class="rotate-90 font-bold tracking-widest text-xs uppercase whitespace-nowrap">
        {{ isOpen ? 'Close' : `Inspect Bag (${chips.length})` }}
      </span>
    </button>

    <div class="w-64 bg-slate-800 border-l border-slate-700 shadow-2xl p-6 overflow-y-auto">
      <h2 class="text-xl font-black text-amber-400 mb-6 uppercase tracking-tight">In The Bag</h2>
      
      <div v-if="chips.length === 0" class="text-slate-500 italic">
        Bag is empty!
      </div>

      <div class="space-y-3">
        <div 
          v-for="group in groupedChips" 
          :key="`${group.color}-${group.value}`"
          class="flex items-center justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-700"
        >
          <div class="flex items-center gap-3">
            <div 
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-inner',
                group.color === 'white' ? 'bg-white text-slate-900' : '',
                group.color === 'orange' ? 'bg-orange-500 text-white' : '',
                group.color === 'green' ? 'bg-emerald-500 text-white' : '',
              ]"
            >
              {{ group.value }}
            </div>
            <span class="capitalize text-sm font-medium text-slate-300">{{ group.color }}</span>
          </div>
          <span class="bg-slate-700 px-2 py-1 rounded text-xs font-mono text-amber-400">
            x{{ group.count }}
          </span>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-slate-700 text-xs text-slate-500">
        <p>Total Chips: {{ chips.length }}</p>
      </div>
    </div>
  </div>
</template>