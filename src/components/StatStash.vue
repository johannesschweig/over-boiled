<script setup lang="ts">
defineProps<{
  vp: number
  rubies: number
  buyingPower: number
}>()
</script>

<template>
  <div class="grid grid-cols-3 gap-2 bg-slate-950/50 p-3 rounded-2xl border border-slate-800 shadow-inner">
    <div class="flex flex-col items-center justify-center border-r border-slate-800">
      <span class="text-[10px] uppercase font-black text-blue-500 tracking-widest">Points</span>
      <div class="flex items-center gap-1">
        <span class="text-xl font-black text-white">{{ vp }}</span>
        <span class="text-blue-500">★</span>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center border-r border-slate-800">
      <span class="text-[10px] uppercase font-black text-red-500 tracking-widest">Rubies</span>
      <div class="flex items-center gap-1">
        <span class="text-xl font-black text-white">{{ rubies }}</span>
        <span class="text-red-500 text-xs">◆</span>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center">
      <span class="text-[10px] uppercase font-black text-amber-500 tracking-widest">Budget</span>
      <div class="flex items-center gap-1">
        <span class="text-xl font-black text-white">{{ buyingPower }}</span>
        <span class="text-amber-500">💰</span>
      </div>
    </div>
  </div>
</template>