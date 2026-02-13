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
  const currentFieldIndex = ref(0)
  const startPosition = ref(0)

  // --- Getters (Computed) ---
  const whiteSum = computed(() =>
    pot.value.filter(c => c.color === 'white').reduce((s, c) => s + c.value, 0)
  )
  const isExploded = computed(() => whiteSum.value > 7)



  // --- Actions (Methods) ---
  function initBag() {
    bag.value = masterInventory.value.map(chip => ({
      ...chip,
      id: Math.random().toString(36).substring(2, 9),
      placedAt: -1,
      isTriggered: false
    }))
  }

  function drawChip() {
    if (bag.value.length === 0 || isExploded.value || hasCollected.value) return

    const randomIndex = Math.floor(Math.random() * bag.value.length);
    const [newChip] = bag.value.splice(randomIndex, 1);

    if (!newChip) return;

    // 1. Determine Position
    const lastPosition = pot.value.length > 0
      ? pot.value[pot.value.length - 1]?.placedAt ?? 0
      : startPosition.value;

    const movement = getChipMovement(newChip);

    // 2. Create the Chip Object
    const chipToPlace: Chip = {
      ...newChip,
      placedAt: lastPosition + movement,
      isTriggered: false // Default to false
    };

    // 3. Initial Trigger Logic (Instant triggers)
    if (newChip.color === 'red' && movement > newChip.value) chipToPlace.isTriggered = true;
    if (['purple', 'black', 'blue'].includes(newChip.color)) chipToPlace.isTriggered = true;

    // 4. Yellow Logic (The "Mandrake" - removing the previous white chip)
    if (newChip.color === 'yellow') {
      // Look at the pot BEFORE we push the yellow chip
      const lastWhiteIndex = [...pot.value].reverse().findIndex(c => c.color === 'white');

      if (lastWhiteIndex !== -1) {
        const actualIndex = pot.value.length - 1 - lastWhiteIndex;
        const [removedWhite] = pot.value.splice(actualIndex, 1);

        if (removedWhite) {
          // Put white back in bag (clean the state)
          bag.value.push({ ...removedWhite, placedAt: -1, isTriggered: false });
          chipToPlace.isTriggered = true; // Now the yellow chip will glow
        }
      }
    }

    // 5. Push to Pot & Update Field
    pot.value.push(chipToPlace);
    currentFieldIndex.value = chipToPlace.placedAt;

    // 6. Global State Update (Green Chips / End of Round triggers)
    // We re-evaluate green chips every time the "last/second-to-last" positions change
    updateGreenChipTriggers();
  }

  /** * Helper to update Green chips based on their distance from the end
   */
  function updateGreenChipTriggers() {
    const potLength = pot.value.length;
    pot.value.forEach((chip, index) => {
      if (chip.color === 'green') {
        // Green triggers if it's the last (index length-1) or second to last (length-2)
        chip.isTriggered = (index >= potLength - 2);
      }
    });
  }

  function collectRewards() {
    const index = Math.min(currentFieldIndex.value, 33)
    const trackField = TRACK_DATA[index] || [0, 0, false]
    const [buyingPower, vp, hasRuby] = trackField
    const purpleChips = pot.value.filter(c => c.color === 'purple').length
    if (purpleChips === 2) {
      startPosition.value += 1
    }

    // rubies
    const greenRubies = (pot.value[pot.value.length - 1]?.color === 'green' ? 1 : 0) + (pot.value[pot.value.length - 2]?.color === 'green' ? 1 : 0)
    const purpleRubies = purpleChips === 2 ? 1 : 0
    const blackRubies = pot.value.filter(c => c.color === 'black').length
    const rub = hasRuby ? 1 : 0 + greenRubies + purpleRubies + blackRubies

    // victory points
    const purpleVP = purpleChips === 0 ? 0 : purpleChips <= 2 ? 1 : 2
    const victoryPoints = vp + purpleVP

    if (hasCollected.value) return

    if (isExploded.value) {
      // Manual Rule: VP or Buying Power. Defaulting to VP for now.
      currentBuyingPower.value = 0

    } else {
      currentBuyingPower.value = buyingPower
    }
    totalVictoryPoints.value += victoryPoints
    rubies.value += rub
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
    currentFieldIndex.value = startPosition.value
    currentBuyingPower.value = 0
    hasCollected.value = false
    initBag()
  }

  function getChipMovement(chip: ChipBase): number {
    const baseValue = chip.value;

    if (chip.color === 'red') {
      const orangeCount = pot.value.filter(c => c.color === 'orange').length;

      if (orangeCount >= 1 && orangeCount <= 2) {
        return baseValue + 1;
      } else if (orangeCount >= 3) {
        return baseValue + 2;
      }
    }

    return baseValue;
  }

  return {
    round, bag, pot, totalVictoryPoints, rubies, currentBuyingPower, hasCollected,
    whiteSum, currentFieldIndex, isExploded, masterInventory,
    initBag, drawChip, collectRewards, buyChip, startNextRound
  }
})