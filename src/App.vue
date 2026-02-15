<script setup lang="ts">
import { onMounted } from 'vue'
import { useGameStore } from '@/store/gameStore'
import BagInventory from '@/components/BagInventory.vue'
import ScoreTrack from '@/components/ScoreTrack.vue'
import TheCauldron from '@/components/TheCauldron.vue'
import ExplosionOverlay from '@/components/ExplosionOverlay.vue'
import StatStash from '@/components/StatStash.vue'
import ShopDisplay from '@/components/ShopDisplay.vue'
import BlueModal from '@/components/BlueModal.vue'
import GameEndScreen from '@/components/GameEndScreen.vue';
import Header from '@/components/Header.vue'

const store = useGameStore()

// Initialize bag on first load
onMounted(() => {
  store.initBag()
})
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 p-4 font-sans select-none overflow-x-hidden">

    <BagInventory v-if="store.hasCollected" />

    <div class="max-w-md mx-auto space-y-6">

      <Header />
      <TheCauldron v-if="!store.hasCollected" />

      <ShopDisplay v-else />

      <ScoreTrack v-if="!store.hasCollected" />

      <StatStash v-if="store.hasCollected" />

      <footer>
        <div class="flex flex-col gap-3">
          <button v-if="!store.hasCollected" @click="store.drawChip" :disabled="store.isExploded"
            class="w-full py-5 rounded-2xl bg-blue-600 font-black text-xl shadow-[0_6px_0_0_#1e40af] active:translate-y-1 active:shadow-none disabled:bg-slate-700 disabled:text-slate-500 disabled:shadow-none transition-all">
            {{ store.isExploded ? 'BOOM!' : 'DRAW CHIP' }}
          </button>

          <button v-if="!store.hasCollected" @click="store.collectRewards"
            class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold uppercase tracking-widest transition-colors shadow-lg">
            Stop & Collect
          </button>

          <button v-if="store.rubies >= 2 && store.hasCollected" @click="store.spendRubyForMove"
            :disabled="store.rubies < 2"
            class="w-full px-2 py-3 bg-red-600 text-slate-100 rounded-xl font-bold text-base shadow-[0_3px_0_0_#b91c1c] active:translate-y-1 active:shadow-none disabled:bg-slate-700 disabled:text-slate-500 disabled:shadow-none transition-all uppercase tracking-tight">
            Spend 2 Rubies for +1 Move
          </button>

          <button v-if="store.hasCollected" @click="store.startNextRound"
            class="w-full py-5 bg-amber-500 text-slate-900 rounded-2xl font-black text-xl shadow-[0_6px_0_0_#b45309] active:translate-y-1 active:shadow-none transition-all uppercase tracking-tight">
            Start Next Round
          </button>
        </div>
      </footer>
    </div>
    <BlueModal v-if="store.draftOptions.length > 0" />

    <ExplosionOverlay v-if="store.isExploded && !store.hasCollected" @reset="store.collectRewards" />

    <GameEndScreen v-if="store.round === 8 && store.hasCollected" />
  </div>
</template>
