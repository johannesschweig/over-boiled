<script setup lang="ts">
import { computed, nextTick, watch, ref } from 'vue'

interface Props {
  currentField: number
  trackData: [number, number, boolean][]
}

const props = defineProps<Props>()
const scrollContainer = ref<HTMLElement | null>(null)

// Auto-scroll to keep the current field centered
watch(() => props.currentField, async () => {
  await nextTick()
  if (scrollContainer.value) {
    const activeField = scrollContainer.value.querySelector(`[data-field="${props.currentField}"]`)
    if (activeField) {
      activeField.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }
})
</script>

<template>
  <div class="w-full bg-slate-950 p-4 rounded-3xl border-2 border-slate-800 shadow-inner">
    <div class="flex items-center justify-between mb-2 px-2">
      <span class="text-[10px] font-black uppercase tracking-widest text-slate-500">Progress Track</span>
    </div>

    <div ref="scrollContainer" class="flex gap-2 overflow-x-auto px-1 py-2 no-scrollbar snap-x">
      <div v-for="(data, index) in trackData" :key="index" :data-field="index" :class="[
        'relative flex-shrink-0 w-12 h-18 rounded-2xl border-2 transition-all duration-500 snap-center flex flex-col items-center justify-between py-3',
        index === currentField
          ? 'bg-amber-500 border-white scale-110 z-10 shadow-[0_0_20px_rgba(251,191,36,0.4)]'
          : index < currentField
            ? 'bg-slate-800 border-slate-700 opacity-50'
            : 'bg-slate-900 border-slate-800'
      ]">
        <div v-if="data[1] > 0" class="bg-blue-600 text-[10px] px-1.5 rounded-sm font-bold">
          {{ data[1] }}
        </div>
        <div v-else class="h-4"></div>

        <span :class="['text-xl font-black', index === currentField ? 'text-slate-900' : 'text-slate-100']">
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