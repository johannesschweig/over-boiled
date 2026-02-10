import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { TRACK_DATA, INITIAL_CHIPS, AVAILABLE_CHIPS } from '@/constants'
import type { Chip, ChipBase, ChipColor } from '@/constants'


export const useGameStore = defineStore('game', () => {
  // --- State ---
  const round = ref(1)
  const masterInventory = ref<ChipBase[]>([...INITIAL_CHIPS])
  const bag = ref<Chip[]>([])
  const pot = ref<Chip[]>([])
  const totalVictoryPoints = ref(0)
  const rubies = ref(0)
  const currentBuyingPower = ref(0)
  const hasCollected = ref(false)

  // --- Getters (Computed) ---
  const whiteSum = computed(() =>
    pot.value.filter(c => c.color === 'white').reduce((s, c) => s + c.value, 0)
  )
  const currentFieldIndex = computed(() =>
    pot.value.reduce((sum, c) => sum + c.value, 0)
  )
  const isExploded = computed(() => whiteSum.value > 7)

  const currentRewards = computed(() => {
    const index = Math.min(currentFieldIndex.value, 33)
    const trackField = TRACK_DATA[index] || [0, 0, false]
    const [buyingPower, vp, hasRuby] = trackField
    return { buyingPower, vp, hasRuby }
  })

  // --- Actions (Methods) ---
  function initBag() {
    bag.value = masterInventory.value.map(chip => ({
      ...chip,
      id: Math.random().toString(36).substring(2, 9)
    }))
  }

  function drawChip() {
    if (bag.value.length === 0 || isExploded.value || hasCollected.value) return
    const randomIndex = Math.floor(Math.random() * bag.value.length)
    const drawnItems = bag.value.splice(randomIndex, 1)
    const chip = drawnItems[0]!
    pot.value.push(chip)
  }

  function collectRewards() {
    if (hasCollected.value) return
    const rewards = currentRewards.value

    if (isExploded.value) {
      // Manual Rule: VP or Buying Power. Defaulting to VP for now.
      totalVictoryPoints.value += rewards.vp
      currentBuyingPower.value = 0
    } else {
      totalVictoryPoints.value += rewards.vp
      currentBuyingPower.value = rewards.buyingPower
      if (rewards.hasRuby) rubies.value++
    }
    hasCollected.value = true
  }

  function buyChip(color: ChipColor, value: number) {
    const cost = AVAILABLE_CHIPS.filter(c => c.color === color && c.value === value)[0]?.price || 99
    if (currentBuyingPower.value >= cost) {
      currentBuyingPower.value -= cost
      masterInventory.value.push({ color, value })
      return true
    }
    return false
  }

  function startNextRound() {
    round.value++
    pot.value = []
    currentBuyingPower.value = 0
    hasCollected.value = false
    initBag()
  }

  return {
    round, bag, pot, totalVictoryPoints, rubies, currentBuyingPower, hasCollected,
    whiteSum, currentFieldIndex, isExploded, currentRewards, masterInventory,
    initBag, drawChip, collectRewards, buyChip, startNextRound
  }
})