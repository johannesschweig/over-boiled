// track data: [buying power, victory points, has ruby]
export const TRACK_DATA: [number, number, boolean][] = [
  [0, 0, false], [1, 0, false], [2, 0, false], [3, 0, false], [4, 0, false],
  [5, 0, true], [6, 1, false], [7, 1, false], [8, 1, false], [9, 1, true],
  [10, 2, false], [11, 2, false], [12, 2, false], [13, 2, true], [14, 3, false],
  [15, 3, false], [15, 3, true], [16, 3, false], [16, 4, false], [17, 4, false],
  [17, 4, true], [18, 4, false], [18, 5, false], [19, 5, false], [19, 5, true],
  [20, 5, false], [20, 6, false], [21, 6, false], [21, 6, true], [22, 7, false],
  [22, 7, true], [23, 7, false], [23, 8, false], [24, 8, false], [24, 8, true],
  [25, 9, false], [25, 9, true], [26, 9, false], [26, 10, false], [27, 10, false],
  [27, 10, true], [28, 11, false], [28, 11, true], [29, 11, false], [29, 12, false],
  [30, 12, false], [30, 12, true], [31, 12, false], [31, 13, false], [32, 13, false],
  [32, 13, true], [33, 14, false], [33, 14, true], [35, 15, false]
];

export type ChipColor = 'white' | 'orange' | 'green' | 'red' | 'blue' | 'yellow' | 'purple' | 'black'

export interface ShopItem {
  color: ChipColor
  value: number
  price: number
  description: string
}

export const AVAILABLE_CHIPS: ShopItem[] = [
  {
    color: 'orange', value: 1, price: 3,
    description: 'No special ability, but a cheap way to fill your pot.'
  },
  {
    color: 'blue', value: 1, price: 5,
    description: 'Place it, then draw 1 chip. You may choose to place it or put it back.'
  },
  {
    color: 'blue', value: 2, price: 10,
    description: 'Place it, then draw 2 chips. Choose 1 to place.'
  },
  {
    color: 'blue', value: 4, price: 19,
    description: 'Place it, then draw 4 chips. Choose 1 to place.'
  },
  {
    color: 'red', value: 1, price: 6,
    description: 'Moves +1/+2 extra space if you already have Orange chips (1-2/3+) in your pot.'
  },
  {
    color: 'red', value: 2, price: 10,
    description: 'Moves +1/+2 extra space if you already have Orange chips (1-2/3+) in your pot.'
  },
  {
    color: 'red', value: 4, price: 16,
    description: 'Moves +1/+2 extra space if you already have Orange chips (1-2/3+) in your pot.'
  },
  {
    color: 'green', value: 1, price: 4,
    description: 'If this is the last or second-to-last chip, gain 1 Ruby.'
  },
  {
    color: 'green', value: 2, price: 8,
    description: 'If this is the last or second-to-last chip, gain 1 Ruby.'
  },
  {
    color: 'green', value: 4, price: 14,
    description: 'If this is the last or second-to-last chip, gain 1 Ruby.'
  },
  {
    color: 'yellow', value: 1, price: 8,
    description: 'If the previous chip was a White chip, return that White chip to the bag.'
  },
  {
    color: 'yellow', value: 2, price: 12,
    description: 'If the previous chip was a White chip, return that White chip to the bag.'
  },
  {
    color: 'yellow', value: 4, price: 18,
    description: 'If the previous chip was a White chip, return that White chip to the bag.'
  },
  {
    color: 'purple', value: 1, price: 9,
    description: 'Provides bonus at the end of the round: 1: 1VP, 2: 1VP+Ruby, 3+: 2VP+1Start.'
  },
  {
    color: 'black', value: 1, price: 10,
    // TODO: neigbor logic
    // description: 'Bonus if you have more black than one of your neighbors: +1Start. Both neighbors: +1Start+Ruby.'
    description: '1: Gain 1 Start. 2: Gain 1 Start and 1 Ruby.'
  }
]

export type ChipBlueprint = Pick<Chip, 'color' | 'value'>;

export interface Chip {
  id: string;
  color: ChipColor;
  value: number;
  placedAt: number;
  isTriggered: boolean;
}

export const INITIAL_CHIPS: ChipBlueprint[] = [
  { color: 'white', value: 3 },
  { color: 'white', value: 2 },
  { color: 'white', value: 2 },
  { color: 'white', value: 1 },
  { color: 'white', value: 1 },
  { color: 'white', value: 1 },
  { color: 'white', value: 1 },
  { color: 'orange', value: 1 },
  { color: 'green', value: 1 },

  // { color: 'blue', value: 2 },
  // { color: 'blue', value: 2 },
  // { color: 'blue', value: 1 },
  // { color: 'blue', value: 4 },
  // { color: 'blue', value: 1 },
  // { color: 'purple', value: 1 },
  // { color: 'yellow', value: 1 },
  // { color: 'yellow', value: 1 },
  // { color: 'yellow', value: 1 },
  // { color: 'purple', value: 1 },
  // { color: 'purple', value: 1 },
  // { color: 'purple', value: 1 },
]

