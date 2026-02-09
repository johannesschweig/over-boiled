<script setup lang="ts">
import { onMounted } from 'vue'
import { useGame } from './composables/useGame'
import { TRACK_DATA } from './constants'
import BagInventory from './components/BagInventory.vue'
import ScoreTrack from './components/ScoreTrack.vue'
import TheCauldron from './components/TheCauldron.vue'
import ExplosionOverlay from './components/ExplosionOverlay.vue'
import { ref } from 'vue'
import StatStash from './components/StatStash.vue'

const {
  round, bag, pot, whiteSum, currentFieldIndex,
  isExploded, drawChip, startNextRound, initBag, collectRewards, totalVictoryPoints, rubies, currentBuyingPower
} = useGame()

const hasCollected = ref(false)

const handleCollect = () => {
  collectRewards()
  hasCollected.value = true
}

const handleNextRound = () => {
  startNextRound()
  hasCollected.value = false
}

onMounted(() => initBag())
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 p-4 font-sans select-none overflow-x-hidden">
    <BagInventory :chips="bag" />

    <div class="max-w-md mx-auto space-y-6">

      <header class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-black text-amber-400 uppercase tracking-tighter">Over Boiled</h1>
          <p class="text-xs text-slate-400 uppercase font-bold">Round {{ round }} / 9</p>
        </div>
        <div
          :class="['px-4 py-2 rounded-lg border-2 font-mono font-bold', isExploded ? 'bg-red-600 animate-pulse' : 'bg-slate-800 border-slate-700']">
          {{ whiteSum }} / 7
        </div>
      </header>

      <TheCauldron v-if="!hasCollected" :chips="pot" />
      
      <div v-else class="h-80 bg-slate-800 rounded-3xl flex items-center justify-center border-4 border-dashed border-slate-700">
        <p class="text-amber-500 font-bold uppercase tracking-widest">Shop Phase Active</p>
      </div>
      <ScoreTrack :current-field="currentFieldIndex" :track-data="TRACK_DATA" />
      <StatStash v-if="hasCollected" :vp="totalVictoryPoints" :rubies="rubies" :buying-power="currentBuyingPower" />

      <footer class="pt-4">
        <div v-if="!hasCollected" class="flex flex-col gap-3">
          <button @click="drawChip" :disabled="isExploded"
            class="w-full py-5 rounded-2xl bg-blue-600 font-black text-xl shadow-[0_6px_0_0_#1e40af] active:translate-y-1 active:shadow-none disabled:opacity-50 transition-all">
            DRAW CHIP
          </button>
          
          <button @click="handleCollect"
            class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold uppercase tracking-widest transition-colors">
            Stop & Collect
          </button>
        </div>

        <button v-else @click="handleNextRound"
          class="w-full py-5 bg-amber-500 text-slate-900 rounded-2xl font-black text-xl shadow-[0_6px_0_0_#b45309] active:translate-y-1 active:shadow-none transition-all uppercase">
          Start Next Round
        </button>
      </footer>
    </div>

    <ExplosionOverlay v-if="isExploded" @reset="startNextRound" />
  </div>
</template>
