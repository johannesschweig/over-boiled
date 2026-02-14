import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { TRACK_DATA, INITIAL_CHIPS, AVAILABLE_CHIPS } from '@/constants'
import type { Chip, ChipColor } from '@/constants'
import { createActiveChip } from '@/utils'

export const useGameStore = defineStore('game', () => {
  // --- State ---
  const round = ref(1)
  const masterInventory = ref<Chip[]>(INITIAL_CHIPS.map(createActiveChip)) // player's inventory
  const draftOptions = ref<Chip[]>([]) // chips being looked at with blue chip
  const bag = ref<Chip[]>([]) // in the bag
  const pot = ref<Chip[]>([]) // in the cauldron
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

  // Helper: Handles the logic of adding a chip to the pot
  function processChipPlacement(baseChip: Chip) {
    // 1. Determine Start Position (Safe check for empty pot)
    const lastPosition = pot.value.length > 0
      ? pot.value[pot.value.length - 1]?.placedAt ?? startPosition.value
      : startPosition.value;

    // 2. Calculate Movement (Red logic is handled inside getChipMovement)
    const movement = getChipMovement(baseChip);

    // 3. Create the "Real" Chip Object
    const chipToPlace: Chip = {
      ...baseChip, // Keeps ID if it has one, or implies a new one
      id: 'id' in baseChip ? baseChip.id : crypto.randomUUID(),
      placedAt: lastPosition + movement,
      isTriggered: false
    };

    // 4. Apply Triggers (Red, Purple, Black, Blue)
    if (baseChip.color === 'red' && movement > baseChip.value) chipToPlace.isTriggered = true;
    if (['purple', 'black', 'blue'].includes(baseChip.color)) chipToPlace.isTriggered = true;

    // 5. Yellow Logic (Mandrake)
    if (baseChip.color === 'yellow') {
      const lastWhiteIndex = [...pot.value].reverse().findIndex(c => c.color === 'white');
      if (lastWhiteIndex !== -1) {
        const actualIndex = pot.value.length - 1 - lastWhiteIndex;
        const [removedWhite] = pot.value.splice(actualIndex, 1);

        if (removedWhite) {
          // Return white to bag clean
          bag.value.push({ ...removedWhite, placedAt: -1, isTriggered: false });
          chipToPlace.isTriggered = true;
        }
      }
    }

    // 6. Push to Pot & Update Track
    pot.value.push(chipToPlace);
    currentFieldIndex.value = chipToPlace.placedAt;

    // 7. Green Logic (Global update)
    updateGreenChipTriggers();

    // 8. Blue Logic (The Recursive Part)
    // If the placed chip is Blue, we immediately draw new options
    if (baseChip.color === 'blue') {
      const count = baseChip.value;
      for (let i = 0; i < count; i++) {
        if (bag.value.length > 0) {
          const randomIndex = Math.floor(Math.random() * bag.value.length);
          const [option] = bag.value.splice(randomIndex, 1);
          if (option) draftOptions.value.push(option);
        }
      }
    }
  }

  function drawChip() {
    if (bag.value.length === 0 || isExploded.value || hasCollected.value) return;

    // Don't draw if we are currently waiting for a Blue choice
    if (draftOptions.value.length > 0) return;

    const randomIndex = Math.floor(Math.random() * bag.value.length);
    const [newChip] = bag.value.splice(randomIndex, 1);

    if (newChip) {
      processChipPlacement(newChip);
    }
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

  function selectBlueOption(index: number | null) {
    // 1. Handle "Put All Back" (index is null)
    if (index === null) {
      bag.value.push(...draftOptions.value.map(c => ({ ...c, placedAt: -1, isTriggered: false })));
      draftOptions.value = [];
      return;
    }

    const selected = draftOptions.value[index];
    if (!selected) return;

    // 2. Return REJECTED options to the bag
    // We filter out the one we chose
    const rejected = draftOptions.value.filter((_, i) => i !== index);
    bag.value.push(...rejected.map(c => ({ ...c, placedAt: -1, isTriggered: false })));

    // 3. Clear the draft array logic
    // Important: Clear it BEFORE processing, so the processor sees an empty draft board 
    // and can fill it up again if the new chip is Blue.
    draftOptions.value = [];

    // 4. Place the chosen chip
    // This will trigger Yellow/Red logic, and if it's Blue, refill the draftOptions!
    processChipPlacement(selected);
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

  function spendRubyForMove() {
    // move start automatically if enough rubies
    if (rubies.value >= 2) {
      rubies.value -= 2
      startPosition.value += 1
    }
  }

  function buyChip(color: ChipColor, value: number) {
    const cost = AVAILABLE_CHIPS.filter(c => c.color === color && c.value === value)[0]?.price || 99
    if (currentBuyingPower.value >= cost) {
      currentBuyingPower.value -= cost
      masterInventory.value.push(createActiveChip({ color, value }))
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

  function getChipMovement(chip: Chip): number {
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
    whiteSum, currentFieldIndex, isExploded, masterInventory, draftOptions,
    initBag, drawChip, collectRewards, buyChip, startNextRound, selectBlueOption, spendRubyForMove
  }
})