<script setup lang="ts">
import { useGameStore } from '@/store/gameStore';
import Chip from '@/components/Chip.vue';
import { computed } from 'vue';

const store = useGameStore()

const warningStyle = computed(() => {
  if (store.isExploded) {
    return 'bg-red-600 border-2 border-red-400 animate-pulse';
  } else if (store.danger && !store.isExploded) {
    return 'bg-orange-400';
  } else {
    return 'bg-slate-700';
  }
})
</script>


<template>
  <main :class="[
    'max-w-md mx-auto relative h-64 w-full rounded-3xl border-2 transition-all duration-300 overflow-hidden',
    store.isExploded ? 'animate-boom border-red-500' : 'bg-slate-800 border-slate-700'
  ]">
    <div class="flex justify-between mt-3 mx-3 items-center relative z-30">
      <div class="heading-caps">Pot</div>
      <div v-if="store.whiteSum"
        :class="['px-2 py-1 rounded-lg font-mono text-xs font-bold transition-all duration-500', warningStyle]">
        {{ store.whiteSum }} / 7
      </div>
    </div>

    <div :class="['flex flex-wrap content-start p-4 gap-3 relative z-10', store.isExploded ? 'chip-blast' : '']">
      <TransitionGroup name="list">
        <Chip v-for="chip in store.pot" :chip="chip" :key="chip.id" />
      </TransitionGroup>
    </div>

    <Transition :css="false" @enter="(el, done) => {
      // We use JS hooks to ensure both animations start together
      el.classList.add('animate-shockwave');
      const text = el.querySelector('h2');
      if (text) text.classList.add('animate-boom-text');
      el.addEventListener('animationend', done);
    }">
      <div v-if="store.showBoomBanner"
        class="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <h2
          class="text-7xl font-black text-red-500 uppercase italic tracking-tighter drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          BOOM!
        </h2>
      </div>
    </Transition>

    <div v-if="store.pot.length === 0" class="absolute inset-0 flex items-center justify-center text-slate-500 italic">
      The pot is empty...
    </div>
  </main>
</template>