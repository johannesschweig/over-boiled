<script setup lang="ts">
import { useGameStore } from '@/store/gameStore';
const store = useGameStore()
</script>

<template>
  <div class="bg-slate-950/50 p-3 rounded-2xl border border-slate-800 shadow-inner">
    <div class="heading-caps mb-3">Stats</div>
    <div class="grid grid-cols-4 gap-2">

      <div class="flex flex-col items-center justify-center border-r border-slate-800">
        <span class="text-[10px] uppercase font-black text-blue-500 tracking-widest">Points</span>
        <div class="flex items-center gap-1">
          <span class="text-xl font-black text-white">{{ store.totalVictoryPoints }}</span>
          <span class="text-blue-500">★</span>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center border-r border-slate-800">
        <span class="text-[10px] uppercase font-black text-red-500 tracking-widest">Rubies</span>
        <div class="flex items-center gap-1">
          <span class="text-xl font-black text-white">{{ store.rubies }}</span>
          <span class="text-red-500 text-xs">◆</span>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center border-r border-slate-800">
        <span class="text-[10px] uppercase font-black text-emerald-500 tracking-widest">Start</span>
        <div class="flex items-center gap-1">
          <span class="text-emerald-500 text-xs">#</span>
          <span class="text-xl font-black text-white">{{ store.startPosition }}</span>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center">
        <span class="text-[10px] uppercase font-black text-amber-500 tracking-widest">Budget</span>
        <div class="flex items-center gap-1">
          <span class="text-xl font-black text-white">{{ store.currentBuyingPower }}</span>
          <span class="text-amber-500">💰</span>
        </div>
      </div>
    </div>
  </div>
</template>