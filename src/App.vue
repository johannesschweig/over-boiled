<script setup lang="ts">
import { onMounted } from 'vue'
import { useGameStore } from '@/store/gameStore'
import Bag from '@/components/Bag.vue'
import Track from '@/components/Track.vue'
import Pot from '@/components/Pot.vue'
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
  <div class="min-h-screen  bg-slate-900 text-slate-100 p-4 font-sans select-none overflow-x-hidden flex flex-col">
    <Bag v-if="store.hasCollected" />
    <div class="flex flex-col w-full md:max-w-md mx-auto space-y-6 grow">
      <Header />
      <template v-if="store.hasCollected">
        <Shop class="grow" />
        <Stats />
      </template>
      <template v-else>
        <Pot class="grow" />
        <Track />
      </template>
      <Footer />
    </div>
    <BlueModal v-if="store.draftOptions.length > 0" />
    <GameEndScreen v-if="store.round === 8 && store.hasCollected" />
    <WelcomeOverlay />
  </div>
</template>
