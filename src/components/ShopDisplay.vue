<script setup lang="ts">
import type { ChipColor } from '../composables/useGame'
import { useGameStore } from '@/store/gameStore'

const props = defineProps<{
  buyingPower: number
  prices: Record<string, number>
}>()

const store = useGameStore()

// Ingredients available in Set 1 (First Game)
const shopItems: { color: ChipColor; value: number; label: string }[] = [
  { color: 'orange', value: 1, label: 'Pumpkin' },
  { color: 'blue', value: 1, label: 'Crow Feather' },
  { color: 'blue', value: 2, label: 'Crow Feather' },
  { color: 'red', value: 1, label: 'Toadstool' },
  { color: 'red', value: 2, label: 'Toadstool' },
  { color: 'green', value: 1, label: 'Garden Spider' },
  { color: 'black', value: 1, label: 'African Death Head Hawkmoth' },
  { color: 'purple', value: 1, label: 'Ghost' },
]

const getPrice = (color: string, value: number) => props.prices[`${color}-${value}`] || 99
</script>

<template>
  <div class="bg-slate-800 rounded-3xl py-2 px-4 border-4 border-slate-700 shadow-2xl overflow-y-auto max-h-[400px]">
    <div class="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2 mb-4">Shop</div>

    <div class="grid grid-cols-1 gap-3">
      <button v-for="item in shopItems" :key="`${item.color}-${item.value}`"
        @click="store.buyChip(item.color, item.value)"" :disabled="buyingPower < getPrice(item.color, item.value)"
        class="flex items-center justify-between p-3 rounded-2xl border-2 transition-all active:scale-95 disabled:opacity-40 disabled:grayscale disabled:active:scale-100"
        :class="[
          buyingPower >= getPrice(item.color, item.value)
            ? 'bg-slate-700 border-slate-600 hover:border-amber-500'
            : 'bg-slate-800 border-slate-700'
        ]">
        <div class="flex items-center gap-3">
          <div :class="[
            'w-10 h-10 rounded-full flex items-center justify-center text-lg font-black shadow-lg',
            item.color === 'orange' ? 'bg-orange-500 text-white' : '',
            item.color === 'blue' ? 'bg-blue-500 text-white' : '',
            item.color === 'red' ? 'bg-red-600 text-white' : '',
            item.color === 'green' ? 'bg-emerald-600 text-white' : '',
            item.color === 'black' ? 'bg-zinc-900 text-white' : '',
            item.color === 'purple' ? 'bg-purple-600 text-white' : '',
          ]">
            {{ item.value }}
          </div>
          <div class="text-left">
            <p class="text-xs font-bold uppercase text-slate-400">{{ item.label }}</p>
            <p class="text-sm font-black text-white capitalize">{{ item.color }} {{ item.value }}</p>
          </div>
        </div>

        <div class="text-right font-black text-amber-500 bg-slate-900 px-3 py-1 rounded-lg">
          {{ getPrice(item.color, item.value) }}
        </div>
      </button>
    </div>
  </div>
</template>