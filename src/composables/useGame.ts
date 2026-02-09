import { ref, computed } from 'vue'
import { TRACK_DATA, SHOP_PRICES } from '../constants'

export type ChipColor = 'white' | 'orange' | 'green' | 'red' | 'blue' | 'yellow' | 'purple'
export interface ChipBase {
  color: ChipColor
  value: number
}
export interface Chip extends ChipBase {
  id: string
}

const INITIAL_CHIPS: Omit<Chip, 'id'>[] = [
  { color: 'white', value: 3 },
  { color: 'white', value: 2 }, { color: 'white', value: 2 },
  { color: 'white', value: 1 }, { color: 'white', value: 1 },
  { color: 'white', value: 1 }, { color: 'white', value: 1 },
  { color: 'orange', value: 1 },
  { color: 'green', value: 1 }
]

export function useGame() {
  const round = ref(1)
  const masterInventory = ref<ChipBase[]>([...INITIAL_CHIPS])
  const bag = ref<Chip[]>([])
  const pot = ref<Chip[]>([])
  const totalVictoryPoints = ref(0)
  const rubies = ref(0)
  const currentBuyingPower = ref(0)

  const whiteSum = computed(() => pot.value.filter(c => c.color === 'white').reduce((s, c) => s + c.value, 0))
  const currentFieldIndex = computed(() => pot.value.reduce((sum, c) => sum + c.value, 0))
  const isExploded = computed(() => whiteSum.value > 7)

  const currentRewards = computed(() => {
    const index = Math.min(currentFieldIndex.value, 33)
    const trackField = TRACK_DATA[index] || [0, 0, false]
    const [buyingPower, vp, hasRuby] = trackField
    return { buyingPower, vp, hasRuby }
  })

  // intialize bag after round change and at game start
  const initBag = () => {
    bag.value = masterInventory.value.map(chip => ({
      ...chip,
      id: Math.random().toString(36).substring(2, 9)
    })) as Chip[]
  }

  const drawChip = () => {
    if (bag.value.length === 0 || isExploded.value) return
    const randomIndex = Math.floor(Math.random() * bag.value.length)
    const drawnChips = bag.value.splice(randomIndex, 1)
    const chip = drawnChips[0]!
    pot.value.push(chip)
  }

  const collectRewards = () => {
    const rewards = currentRewards.value

    if (isExploded.value) {
      // In testing/simple mode: Give VP, but lose Buying Power and Ruby
      totalVictoryPoints.value += rewards.vp
      currentBuyingPower.value = 0
    } else {
      // Success: Add everything
      totalVictoryPoints.value += rewards.vp
      currentBuyingPower.value = rewards.buyingPower
      if (rewards.hasRuby) rubies.value++
    }
  }

  const startNextRound = () => {
    round.value++
    pot.value = []
    currentBuyingPower.value = 0 // Reset budget for new round
    initBag()
  }

  const buyChip = (color: ChipColor, value: number) => {
    const priceKey = `${color}-${value}`
    const cost = SHOP_PRICES[priceKey] || 99

    if (currentBuyingPower.value >= cost) {
      currentBuyingPower.value -= cost
      const newChip: ChipBase = { color, value }
      masterInventory.value.push(newChip)

      bag.value.push({
        ...newChip,
        id: Math.random().toString(36).substring(2, 9)
      })
      return true
    }
    return false
  }

  return {
    round, bag, pot, totalVictoryPoints, rubies, whiteSum,
    currentFieldIndex, isExploded, currentRewards, drawChip, startNextRound, initBag, collectRewards, currentBuyingPower, buyChip, masterInventory
  }
}