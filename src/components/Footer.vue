<script setup lang="ts">
import { useGameStore } from '@/store/gameStore';
import { TRACK_DATA } from '@/constants';
import { computed } from 'vue';

const store = useGameStore();

const rewards = computed(() => {
  const index = Math.min(store.currentFieldIndex, 33)
  const [buyingPower, vp] = TRACK_DATA[index] || [0, 0, false]
  return { buyingPower, vp }
})
</script>

<template>
  <footer class="p-4 bg-slate-900/50 backdrop-blur-md border-t border-slate-800">
    <div class="flex flex-col gap-3 max-w-md mx-auto">

      <template v-if="!store.hasCollected && !store.isExploded">
        <button @click="store.drawChip" class="btn-3d-blue">
          DRAW CHIP
        </button>
        <button @click="store.collectRewards" :class="store.danger ? 'btn-orange' : 'btn-orange-outline'">
          Stop & Collect
        </button>
      </template>

      <template v-else-if="store.isExploded && !store.hasCollected">
        <div class="text-center mb-1">
          <p class="text-red-400 font-black uppercase text-xs tracking-widest">Pot Exploded! Choose:</p>
        </div>
        <div class="grid grid-rows-2 gap-3">
          <button @click="store.chooseExplosionPenalty('BP')" class="btn-orange">
            Keep <br />{{ rewards.buyingPower }} Buying Power
          </button>
          <button @click="store.chooseExplosionPenalty('VP')" class="btn-blue">
            Keep <br /> {{ rewards.vp }} Victory Points
          </button>
        </div>
      </template>

      <template v-else-if="store.hasCollected">
        <button v-if="store.rubies >= 2" @click="store.spendRubyForMove" class="w-full btn-danger">
          Spend 2 <span class="text-xs">◆</span> for +1 Start
        </button>

        <button @click="store.startNextRound"
          :class="store.currentBuyingPower < 3 ? 'btn-3d-orange' : 'btn-orange-outline'">
          Start Next Round
        </button>
      </template>

    </div>
  </footer>
</template>