<script setup lang="ts">
interface Rewards {
  buyingPower: number
  vp: number
  hasRuby: boolean
}

defineProps<{
  rewards: Rewards
  isExploded: boolean
}>()

defineEmits(['confirm'])
</script>

<template>
  <div class="bg-slate-800 border-2 border-amber-500/50 p-6 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-300">
    <div class="text-center mb-6">
      <h3 class="text-amber-500 font-black uppercase tracking-widest">End of Round Results</h3>
      <p v-if="isExploded" class="text-red-500 text-xs font-bold uppercase mt-1 animate-pulse">
        ⚠️ The Pot Exploded!
      </p>
    </div>

    <div class="grid grid-cols-3 gap-4 mb-8">
      <div class="flex flex-col items-center p-3 bg-slate-900 rounded-2xl border border-slate-700">
        <span class="text-2xl font-black text-white">{{ rewards.buyingPower }}</span>
        <span class="text-[10px] uppercase text-slate-500 font-bold">Buying Power</span>
      </div>

      <div class="flex flex-col items-center p-3 bg-slate-900 rounded-2xl border border-blue-900">
        <span class="text-2xl font-black text-blue-400">+{{ rewards.vp }}</span>
        <span class="text-[10px] uppercase text-slate-500 font-bold">Points</span>
      </div>

      <div class="flex flex-col items-center p-3 bg-slate-900 rounded-2xl border border-red-900">
        <span class="text-2xl font-black text-red-500">{{ rewards.hasRuby ? '+1' : '0' }}</span>
        <span class="text-[10px] uppercase text-slate-500 font-bold">Rubies</span>
      </div>
    </div>

    <button 
      @click="$emit('confirm')"
      class="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-2xl uppercase tracking-tighter shadow-[0_4px_0_0_rgba(180,83,9,1)] active:translate-y-1 active:shadow-none transition-all"
    >
      Collect & Start Next Round
    </button>
    
    <p v-if="isExploded" class="text-[10px] text-slate-500 text-center mt-4 px-4 leading-tight">
      Note: Since you exploded, your buying power is sacrificed to save your victory points.
    </p>
  </div>
</template>