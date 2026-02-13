<script setup lang="ts">
import { computed } from 'vue';
import { useGameStore } from '@/store/gameStore'
import { AVAILABLE_CHIPS } from '@/constants'
import Chip from '@/components/Chip.vue';

const store = useGameStore()

const chipsFilteredAndSorted = computed(() => {
  return AVAILABLE_CHIPS
    .filter(chip => chip.price <= store.currentBuyingPower)
    .sort((a, b) => b.price - a.price)
})
</script>

<template>
  <div class="bg-slate-800 rounded-3xl py-2 px-4 border-4 border-slate-700 shadow-2xl overflow-y-auto max-h-[400px]">
    <div class="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2 mb-4">Shop</div>

    <div v-if="chipsFilteredAndSorted.length > 0" class="grid grid-cols-1 gap-3">
      <button v-for="item in chipsFilteredAndSorted" :key="`${item.color}-${item.value}`"
        @click="store.buyChip(item.color, item.value)" :disabled="store.currentBuyingPower < item.price"
        class="flex items-center justify-between p-3 rounded-2xl border-2 transition-all active:scale-95 disabled:opacity-40 disabled:grayscale disabled:active:scale-100"
        :class="[
          store.currentBuyingPower >= item.price
            ? 'bg-slate-700 border-slate-600 hover:border-amber-500'
            : 'bg-slate-800 border-slate-700'
        ]">
        <div class="grid grid-cols-[40px_1fr_40px] items-center gap-3">
          <Chip :chip="item" size="sm"/>
          <div class="text-left">
            <p class="text-sm font-black text-white capitalize">{{ item.color }}</p>
            <p class="text-xs text-slate-400">{{ item.description }}</p>
          </div>
          <div class="text-right font-black text-amber-500 bg-slate-900 px-3 py-1 rounded-lg">
            {{ item.price }}
          </div>
        </div>
      </button>
    </div>

    <div v-else class="text-sm italic text-slate-500 text-center py-10">
      No chips available for purchase.
    </div>
  </div>
</template>