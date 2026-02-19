<script setup lang="ts">
import { computed } from 'vue';
import { useGameStore } from '@/store/gameStore';

const store = useGameStore();

// Define the stats configuration locally to keep the template dry
const stats = computed(() => [
  {
    label: 'Points',
    value: store.totalVictoryPoints,
    color: 'text-blue-500',
    icon: '★',
    border: true
  },
  {
    label: 'Rubies',
    value: store.rubies,
    color: 'text-red-500',
    icon: '◆',
    border: true
  },
  {
    label: 'Start',
    value: store.startPosition,
    color: 'text-emerald-500',
    icon: '#',
    border: true
  },
  {
    label: 'Budget',
    value: store.currentBuyingPower,
    color: 'text-amber-500',
    icon: '💰',
    border: false
  }
]);
</script>

<template>
  <div class="bg-slate-950/50 p-3 rounded-2xl border border-slate-800 shadow-inner">
    <div class="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-3">
      Stats
    </div>

    <div class="grid grid-cols-4 gap-2">
      <div 
        v-for="stat in stats" 
        :key="stat.label"
        class="flex flex-col items-center justify-center"
        :class="{ 'border-r border-slate-800': stat.border }"
      >
        <span class="text-[10px] uppercase font-black tracking-widest" :class="stat.color">
          {{ stat.label }}
        </span>
        
        <div class="flex items-center gap-1">
          <span class="text-xl font-black text-white">
            {{ stat.value }}
          </span>
          <span class="text-xs font-bold" :class="stat.color">
            {{ stat.icon }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>