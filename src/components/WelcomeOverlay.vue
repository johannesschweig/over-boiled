<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '@/store/gameStore'

const store = useGameStore()

const currentSlide = ref(0)

const slides = [
  {
    "title": "Welcome to Over Boiled!",
    "description": "You are an alchemist trying to brew the most valuable potion. Draw ingredients (chips) from your bag and place them into your pot to begin!",
    "image": "1-draw-chip.png",
  },
  {
    "title": "Master the Track",
    "description": "Chip values move you forward: a '2-chip' moves you 2 spaces. Your final position determines your Buying Power, Victory Points <img src='src/assets/vp.png' class='inline-icon' />, and Rubies <img src='src/assets/ruby.png' class='inline-icon' />.",
    "image": "2-track.png",
  },
  {
    "title": "Don't Overboil!",
    "description": "Keep your white chip total at 7 or less. If you exceed 7, the pot explodes! You'll keep your victory points and rubies, but you lose your chance to shop this round. The meter in the top right will show you the current count.",
    "image": "3-boom.png",
  },
  {
    "title": "Your Starter Bag",
    "description": "You begin with a mix of White chips, one Orange chip, and one Green chip.",
    "image": "4-starter-kit.png",
  },
  {
    "title": "The Alchemist's Shop",
    "description": "Spend your Buying Power on colored chips with special powers. Use 'View Bag' during the shopping phase to see exactly what's in your bag.",
    "image": "5-shopping.png",
  }
]

const nextSlide = () => {
  if (currentSlide.value < slides.length - 1) {
    currentSlide.value++
  } else {
    startGame()
  }
}

const startGame = () => {
  store.toggleWelcome(true)
  currentSlide.value = 0
}

</script>

<template>
  <Transition name="fade">
    <div v-if="!store.hideWelcome" class="overlay-backdrop bg-slate-950/90">
      
      <div class="panel-dark max-w-md w-full overflow-hidden border-amber-500/20">
        
        <div class="flex h-1.5 bg-slate-900">
          <div 
            v-for="(_slide, index) in slides" 
            :key="index" 
            class="flex-1 transition-all duration-500"
            :class="index <= currentSlide ? 'bg-amber-500' : 'bg-transparent'"
          ></div>
        </div>

        <div class="p-8 text-center">
          <!-- icon for the first slide -->
          <div v-if="currentSlide === 0" class="w-24 h-24 panel-inset mx-auto mb-6 flex items-center justify-center text-5xl shadow-lg border-slate-700">
            🧪
          </div>

          <h2 class="heading-secondary mb-4 min-h-15 flex items-center justify-center text-amber-400" >
            {{ slides[currentSlide]?.title }}
          </h2>

          <p class="text-slate-300 leading-relaxed mb-8 min-h-20" v-html="slides[currentSlide]?.description"></p>

          <img :src="`/src/assets/${slides[currentSlide]?.image}`" :alt="slides[currentSlide]?.title"
            class="w-full h-48 object-contain mb-4 rounded-2xl" />

          <div class="flex flex-col gap-4">
            <button @click="nextSlide" class="btn-orange w-full">
              {{ currentSlide === slides.length - 1 ? 'Start Brewing' : 'Next' }}
            </button>

            <button @click="startGame" class="btn-ghost">
              Skip Introduction
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Keeping your transition logic */
.fade-enter-active, .fade-leave-active { transition: all 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: scale(0.95); }
</style>