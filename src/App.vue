<script setup lang="ts">
import { onMounted } from 'vue'
import { useGameStore } from '@/store/gameStore'

// Components
import BagInventory from './components/BagInventory.vue'
import ScoreTrack from './components/ScoreTrack.vue'
import TheCauldron from './components/TheCauldron.vue'
import ExplosionOverlay from './components/ExplosionOverlay.vue'
import StatStash from './components/StatStash.vue'
import ShopDisplay from './components/ShopDisplay.vue'

const store = useGameStore()

// Initialize bag on first load
onMounted(() => {
  store.initBag()
})
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 p-4 font-sans select-none overflow-x-hidden">

    <BagInventory v-if="store.hasCollected" :master-chips="store.masterInventory" />

    <div class="max-w-md mx-auto space-y-6">

      <header class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-black text-amber-400 uppercase tracking-tighter">Over Boiled</h1>
        </div>

        <div :class="[
          'px-4 py-2 rounded-lg border-2 font-mono font-bold transition-all duration-500',
          store.isExploded ? 'bg-red-600 border-red-400 animate-pulse' : 'bg-slate-800 border-slate-700'
        ]">
          {{ store.whiteSum }} / 7
        </div>
      </header>

      <TheCauldron v-if="!store.hasCollected" :chips="store.pot" />

      <ShopDisplay v-else :buying-power="store.currentBuyingPower" />

      <ScoreTrack v-if="!store.hasCollected" :current-field="store.currentFieldIndex" />

      <StatStash v-if="store.hasCollected" :vp="store.totalVictoryPoints" :rubies="store.rubies"
        :buying-power="store.currentBuyingPower" />

      <footer class="pt-4">
        <div v-if="!store.hasCollected" class="flex flex-col gap-3">
          <button @click="store.drawChip" :disabled="store.isExploded"
            class="w-full py-5 rounded-2xl bg-blue-600 font-black text-xl shadow-[0_6px_0_0_#1e40af] active:translate-y-1 active:shadow-none disabled:bg-slate-700 disabled:text-slate-500 disabled:shadow-none transition-all">
            {{ store.isExploded ? 'BOOM!' : 'DRAW CHIP' }}
          </button>

          <button @click="store.collectRewards"
            class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold uppercase tracking-widest transition-colors shadow-lg">
            Stop & Collect
          </button>
        </div>

        <button v-else @click="store.startNextRound"
          class="w-full py-5 bg-amber-500 text-slate-900 rounded-2xl font-black text-xl shadow-[0_6px_0_0_#b45309] active:translate-y-1 active:shadow-none transition-all uppercase tracking-tight">
          Start Next Round
        </button>
      </footer>
    </div>

    <ExplosionOverlay v-if="store.isExploded && !store.hasCollected" @reset="store.collectRewards" />
  </div>
</template>
