<script setup lang="ts">
import { onMounted } from 'vue'
import { useGameStore } from '@/store/gameStore'
import Bag from '@/components/Bag.vue'
import Track from '@/components/Track.vue'
import Pot from '@/components/Pot.vue'
import ExplosionOverlay from '@/components/ExplosionOverlay.vue'
import Stats from '@/components/Stats.vue'
import Shop from '@/components/Shop.vue'
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
    <Bag v-if="store.hasCollected" />
    <div class="max-w-md mx-auto space-y-6">
      <Header />
      <Pot v-if="!store.hasCollected" />
      <Shop v-else />
      <Track v-if="!store.hasCollected" />
      <Stats v-if="store.hasCollected" />
      <Footer />
    </div>
    <BlueModal v-if="store.draftOptions.length > 0" />
    <ExplosionOverlay v-if="store.isExploded && !store.hasCollected" @reset="store.collectRewards" />
    <GameEndScreen v-if="store.round === 8 && store.hasCollected" />
    <WelcomeOverlay />
  </div>
</template>
