<script setup lang="ts">
import { useGameStore } from '@/store/gameStore';
import { computed, onMounted, ref } from 'vue';

const store = useGameStore();
const dataSent = ref(false);

const score = computed(() => {
  const vp = store.totalVictoryPoints + Math.floor(store.currentBuyingPower / 5) + Math.floor(store.rubies / 2);
  const rubies = store.rubies % 2;
  const buyingPower = store.currentBuyingPower % 5;
  return { vp, rubies, buyingPower };
})

function reload() {
  location.reload();
}

async function saveToGoogleSheets() {
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

  // 1. Helper to count chips by color and value
  const count = (color: string, val: number) => 
    store.masterInventory.filter(c => c.color === color && c.value === val).length;

  // 2. Aggregate the data into the structure the Script expects
  const payload = {
    victoryPoints: score.value.vp,
    
    // Spread the Buying Power history into bpR1, bpR2, etc.
    bpR1: store.roundHistory[0] || 0,
    bpR2: store.roundHistory[1] || 0,
    bpR3: store.roundHistory[2] || 0,
    bpR4: store.roundHistory[3] || 0,
    bpR5: store.roundHistory[4] || 0,
    bpR6: store.roundHistory[5] || 0,
    bpR7: store.roundHistory[6] || 0,
    bpR8: store.roundHistory[7] || 0,

    // Chip variant counts
    white1: count('white', 1),
    white2: count('white', 2),
    white3: count('white', 3),
    green1: count('green', 1),
    green2: count('green', 2),
    green4: count('green', 4),
    blue1: count('blue', 1),
    blue2: count('blue', 2),
    blue4: count('blue', 4),
    red1: count('red', 1),
    red2: count('red', 2),
    red4: count('red', 4),
    yellow1: count('yellow', 1),
    yellow2: count('yellow', 2),
    yellow4: count('yellow', 4),
    orange1: count('orange', 1),
    purple1: count('purple', 1),
    black1: count('black', 1)
  };

  try {
    // 3. Send the data
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Essential for Google Apps Script
      headers: {
        'Content-Type': 'text/plain', // Avoids CORS preflight
      },
      body: JSON.stringify(payload),
    });
    
    console.log("Game data sent to cloud.");
    dataSent.value = true;
  } catch (error) {
    console.error("Failed to sync with Google Sheets:", error);
  }
}

onMounted(() => {
  saveToGoogleSheets();
})
</script>

<template>
  <div class="fixed inset-0 bg-slate-900/95 z-50 flex items-center justify-center p-4">
    <div class="bg-slate-800 border-4 border-amber-500 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">

      <h1 class="text-4xl font-black text-amber-500 mb-2 uppercase tracking-widest">The Festival Ends!</h1>
      <p v-if="dataSent" class="text-slate-400 mb-8 italic">The fires die down in Quedlinburg...</p>

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