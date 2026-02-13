<script setup lang="ts">
import { chipColorStyle } from '@/utils';
import type { Chip, ChipBase } from '@/constants';

defineProps<{
  chip: Chip | ChipBase
  size?: 'sm' | 'md'
}>()
</script>

<template>
  <div :class="[
    'rounded-full flex items-center justify-center font-black shadow-lg',
    chipColorStyle(chip.color),
    size === 'sm' ? 'w-10 h-10 text-base' : 'w-12 h-12 text-xl',
    ('isTriggered' in chip && chip.isTriggered) ? 'opacity-100 border-b-4' : 'opacity-90'
  ]">
    {{ chip.value }}
  </div>
</template>