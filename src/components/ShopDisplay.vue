<script setup lang="ts">
import { computed, ref } from 'vue';
import { useGameStore } from '@/store/gameStore'
import { AVAILABLE_CHIPS } from '@/constants'
import type { ChipBlueprint, ChipColor } from '@/constants';
import Chip from '@/components/Chip.vue';

const store = useGameStore()
const chipsBought = ref<ChipBlueprint[]>([])

const chipsFilteredAndSorted = computed(() => {
  if (chipsBought.value.length >= 2) return []
  var chipsInShop = AVAILABLE_CHIPS
  if (store.round < 2) {
    chipsInShop = chipsInShop.filter(chip => chip.color !== 'yellow');
  }
  if (store.round < 3) {
    chipsInShop = chipsInShop.filter(chip => chip.color !== 'purple');
  }
  return chipsInShop
    .filter(chip => !chipsBought.value.some(bought => bought.color === chip.color && bought.value === chip.value))
    .filter(chip => chip.price <= store.currentBuyingPower)
    .sort((a, b) => b.price - a.price)
})

function buyChip(color: ChipColor, value: number) {
  chipsBought.value.push({ color, value })
  store.buyChip(color, value)
}
</script>

<template>
  <div class="bg-slate-800 rounded-3xl py-2 px-4 border-2 border-slate-700 shadow-2xl overflow-y-auto max-h-100">
    <div class="heading-caps mt-2 mb-2">Shop</div>
    <div class="text-xs text-slate-400 mb-4">Buy 1 or 2 different chips</div>

    <div v-if="chipsFilteredAndSorted.length > 0" class="grid grid-cols-1 gap-3">
      <button v-for="item in chipsFilteredAndSorted" :key="`${item.color}-${item.value}`"
        @click="buyChip(item.color, item.value)" :disabled="store.currentBuyingPower < item.price"
        class="flex items-center justify-between bg-slate-700 p-3 rounded-2xl active:scale-95 disabled:opacity-40 disabled:grayscale disabled:active:scale-100">
        <div class="grid grid-cols-[40px_1fr_40px] items-center gap-3 w-full">
          <Chip :chip="item" size="sm" />
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