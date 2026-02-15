<script setup lang="ts">
import { useGameStore } from '@/store/gameStore';
const store = useGameStore();
</script>

<template>
  <footer>
    <div class="flex flex-col gap-3">
      <button v-if="!store.hasCollected" @click="store.drawChip" :disabled="store.isExploded"
        class="w-full py-5 rounded-2xl bg-blue-600 font-black text-xl shadow-[0_6px_0_0_#1e40af] active:translate-y-1 active:shadow-none disabled:bg-slate-700 disabled:text-slate-500 disabled:shadow-none transition-all">
        {{ store.isExploded ? 'BOOM!' : 'DRAW CHIP' }}
      </button>

      <button v-if="!store.hasCollected" @click="store.collectRewards" :class="['w-full py-3 rounded-xl font-bold uppercase tracking-widest transition-colors shadow-lg',
        store.danger ? 'bg-emerald-600 hover:bg-emerald-500' : 'border-2 border-emerald-700 text-emerald-500 hover:bg-emerald-900'
      ]">
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
</template>