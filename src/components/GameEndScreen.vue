<script setup lang="ts">
import { useGameStore } from '@/store/gameStore';
import { computed } from 'vue';

const store = useGameStore();

const score = computed(() => {
  const vp = store.totalVictoryPoints + Math.floor(store.currentBuyingPower / 5) + Math.floor(store.rubies / 2);
  const rubies = store.rubies % 2;
  const buyingPower = store.currentBuyingPower % 5;
  return { vp, rubies, buyingPower };
})

function reload() {
  location.reload();
}
</script>

<template>
  <div class="fixed inset-0 bg-slate-900/95 z-50 flex items-center justify-center p-4">
    <div class="bg-slate-800 border-4 border-amber-500 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">

      <h1 class="text-4xl font-black text-amber-500 mb-2 uppercase tracking-widest">The Festival Ends!</h1>
      <p class="text-slate-400 mb-8 italic">The fires die down in Quedlinburg...</p>

      <div class="bg-slate-900 rounded-xl p-6 space-y-4 mb-8 text-lg">

        <div class="flex justify-between items-center border-b border-slate-700 pb-2">
          <span class="text-slate-300">Victory Points</span>
          <span class="font-bold text-white">{{ score.vp }} VP</span>
        </div>

        <div class="flex justify-between items-center text-red-400">
          <span class="text-sm">Rubies</span>
          <span class="font-bold text-white">{{ score.rubies }}  <span class="text-red-500 text-xs">◆</span></span>

        </div>

        <div class="flex justify-between items-center text-yellow-400 border-b border-slate-700 pb-2">
          <span class="text-sm">Budget</span>
          <span class="font-bold text-white">{{ score.buyingPower }} 💰</span>
        </div>
      </div>

      <button @click="reload()"
        class="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 rounded-xl text-xl transition-all uppercase shadow-lg hover:scale-105 active:scale-95">
        Brew Again
      </button>

    </div>
  </div>
</template>