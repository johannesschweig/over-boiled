<script setup lang="ts">
import { onMounted } from 'vue'
import { useGameStore } from '@/store/gameStore'
import BagInventory from '@/components/BagInventory.vue'
import ScoreTrack from '@/components/ScoreTrack.vue'
import Pot from '@/components/Pot.vue'
import ExplosionOverlay from '@/components/ExplosionOverlay.vue'
import StatStash from '@/components/StatStash.vue'
import ShopDisplay from '@/components/ShopDisplay.vue'
import BlueModal from '@/components/BlueModal.vue'
import GameEndScreen from '@/components/GameEndScreen.vue';
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import WelcomeOverlay from './components/WelcomeOverlay.vue'

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
      <Pot v-if="!store.hasCollected" />
      <ShopDisplay v-else />
      <ScoreTrack v-if="!store.hasCollected" />
      <StatStash v-if="store.hasCollected" />
      <Footer />
    </div>
    <BlueModal v-if="store.draftOptions.length > 0" />
    <ExplosionOverlay v-if="store.isExploded && !store.hasCollected" @reset="store.collectRewards" />
    <GameEndScreen v-if="store.round === 8 && store.hasCollected" />
    <WelcomeOverlay />
  </div>
</template>
