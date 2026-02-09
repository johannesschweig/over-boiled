<script setup lang="ts">
defineEmits(['reset'])
</script>

<template>
  <div class="fixed inset-0 bg-red-900/40 backdrop-blur-sm flex items-center justify-center p-6 z-50">
    <div class="bg-slate-900 border-4 border-red-500 p-8 rounded-3xl text-center shadow-2xl max-w-xs">
      <h2 class="text-4xl font-black text-red-500 mb-2 uppercase tracking-tighter">Boom!</h2>
      <p class="text-slate-300 mb-6 font-medium">Too many white chips!</p>
      <button @click="$emit('reset')" class="w-full py-4 bg-red-600 hover:bg-red-500 rounded-xl font-bold uppercase tracking-widest transition-colors">
        Try Again
      </button>
    </div>
  </div>
</template>