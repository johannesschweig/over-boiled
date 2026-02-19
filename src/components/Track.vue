<script setup lang="ts">
import { nextTick, watch, ref } from 'vue'
import { TRACK_DATA } from '@/constants'
import { useGameStore } from '@/store/gameStore'

const store = useGameStore()
const scrollContainer = ref<HTMLElement | null>(null)

// Auto-scroll to keep the current field centered
watch(() => store.currentFieldIndex, async () => {
  await nextTick()
  if (scrollContainer.value) {
    const activeField = scrollContainer.value.querySelector(`[data-field="${store.currentFieldIndex}"]`)
    if (activeField) {
      activeField.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }
})
</script>

<template>
  <div class="w-full bg-slate-950 p-4 rounded-3xl border-2 border-slate-800 shadow-inner">
    <div class="flex items-center justify-between mb-2 px-2">
      <span class="heading-caps">Progress Track</span>
    </div>

    <div ref="scrollContainer" class="flex gap-2 overflow-x-auto px-1 py-2 no-scrollbar snap-x">
      <div v-for="(data, index) in TRACK_DATA" :key="index" :data-field="index" v-show="index >= store.startPosition"
        :class="['relative shrink-0 w-12 h-18 rounded-2xl border-2 transition-all duration-500 snap-center flex flex-col items-center justify-between py-3',
          index === store.startPosition && index === store.currentFieldIndex
            ? 'bg-emerald-500 border-white scale-110 z-10 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
            : index === store.currentFieldIndex
              ? 'bg-amber-500 border-white scale-110 z-10 shadow-[0_0_20px_rgba(251,191,36,0.4)]'
              : index >= store.currentFieldIndex
                ? 'bg-slate-900 border-slate-800'
                : 'bg-slate-900  border-slate-800 opacity-50'
        ]">
        <div v-if="data[1] > 0" class="bg-blue-600 text-[10px] px-1.5 rounded-sm font-bold">
          {{ data[1] }}
        </div>
        <div v-else class="h-4"></div>

        <span :class="['text-xl font-black', index === store.currentFieldIndex ? 'text-slate-900' : 'text-slate-100']">
          {{ data[0] }}
        </span>

        <div class="h-4">
          <span v-if="data[2]" class="text-red-500 text-xs">◆</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>