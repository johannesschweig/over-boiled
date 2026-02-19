<script setup lang="ts">
import { useGameStore } from '@/store/gameStore';
const store = useGameStore();
</script>

<template>
  <footer>
    <div class="flex flex-col gap-3">
      <button v-if="!store.hasCollected" @click="store.drawChip" :disabled="store.isExploded"
        class="btn-3d-blue">
        {{ store.isExploded ? 'BOOM!' : 'DRAW CHIP' }}
      </button>

      <button v-if="!store.hasCollected" @click="store.collectRewards" :class="[
        store.danger ? 'btn-orange' : 'btn-orange-outline'
      ]">
        Stop & Collect
      </button>

      <button v-if="store.rubies >= 2 && store.hasCollected" @click="store.spendRubyForMove"
        :disabled="store.rubies < 2"
        class="w-full btn-danger">
        Spend 2 <span class="text-xs">◆</span> for +1 Start
      </button>

      <button v-if="store.hasCollected" @click="store.startNextRound"
        :class="store.currentBuyingPower < 3 ? 'btn-3d-orange' : 'btn-orange-outline'">
        Start Next Round
      </button>
    </div>
  </footer>
</template>