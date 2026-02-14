import type { ChipColor } from '@/constants'
import type { Chip, ChipBlueprint } from '@/constants'

export const chipColorStyle = (color: ChipColor) => {
  switch (color) {
    case 'white':
      return 'bg-white text-slate-900 border-slate-300'
    case 'orange':
      return 'bg-orange-500 text-white border-black/20'
    case 'green':
      return 'bg-emerald-500 text-white border-black/20'
    case 'blue':
      return 'bg-blue-500 text-white border-black/20'
    case 'red':
      return 'bg-rose-600 text-white border-black/20'
    case 'black':
      return 'bg-zinc-900 text-white border-black/20'
    case 'purple':
      return 'bg-purple-600 text-white border-black/20'
    case 'yellow':
      return 'bg-yellow-400 text-slate-900 border-black/20'
  }
}

export function createActiveChip(blueprint: ChipBlueprint): Chip {
  return {
    color: blueprint.color,
    value: blueprint.value,
    id: crypto.randomUUID(), // Native browser UUID
    placedAt: -1,            // Default state
    isTriggered: false       // Default state
  };
}