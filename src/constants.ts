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
  label: string
}

export const AVAILABLE_CHIPS: ShopItem[] = [
  {
    color: 'orange', value: 1, price: 3, label: 'Pumpkin',
    description: 'No special ability, but a cheap way to fill your pot.'
  },
  {
    color: 'blue', value: 1, price: 5, label: 'Crow Feather',
    description: 'Place it, then draw 1 chip. You may choose to place it or put it back.'
  },
  {
    color: 'blue', value: 2, price: 10, label: 'Crow Feather',
    description: 'Place it, then draw 2 chips. Choose 1 to place.'
  },
  {
    color: 'blue', value: 4, price: 19, label: 'Crow Feather',
    description: 'Place it, then draw 4 chips. Choose 1 to place.'
  },
  {
    color: 'red', value: 1, price: 6, label: 'Toadstool',
    description: 'Moves +1 extra space if you already have Orange chips in your pot.'
  },
  {
    color: 'red', value: 2, price: 10, label: 'Toadstool',
    description: 'Moves +1 extra space if you already have Orange chips in your pot.'
  },
  {
    color: 'red', value: 4, price: 16, label: 'Toadstool',
    description: 'Moves +2 extra spaces if you already have 2+ Orange chips.'
  },
  {
    color: 'green', value: 1, price: 4, label: 'Garden Spider',
    description: 'If this is the last or second-to-last chip, gain 1 Ruby.'
  },
  {
    color: 'green', value: 2, price: 8, label: 'Garden Spider',
    description: 'If this is the last or second-to-last chip, gain 1 Ruby.'
  },
  {
    color: 'green', value: 4, price: 14, label: 'Garden Spider',
    description: 'If this is the last or second-to-last chip, gain 1 Ruby.'
  },
  {
    color: 'yellow', value: 1, price: 8, label: 'Mandrake',
    description: 'If the previous chip was a White chip, return that White chip to the bag.'
  },
  {
    color: 'yellow', value: 1, price: 12, label: 'Mandrake',
    description: 'If the previous chip was a White chip, return that White chip to the bag.'
  },
  {
    color: 'yellow', value: 4, price: 18, label: 'Mandrake',
    description: 'If the previous chip was a White chip, return that White chip to the bag.'
  },
  {
    color: 'purple', value: 1, price: 9, label: 'Ghost',
    description: 'Moves forward and provides bonus Victory Points at the end of the round.'
  },
  {
    color: 'black', value: 1, price: 10, label: 'African Death Head Hawkmoth',
    description: 'Gain a bonus move if your neighbors have fewer Black chips than you.'
  }
]

export interface ChipBase { color: ChipColor; value: number }
export interface Chip extends ChipBase { id: string }

export const INITIAL_CHIPS: ChipBase[] = [
  { color: 'white', value: 3 },
  { color: 'white', value: 2 },
  { color: 'white', value: 2 },
  { color: 'white', value: 1 },
  { color: 'white', value: 1 },
  { color: 'white', value: 1 },
  { color: 'white', value: 1 },
  { color: 'orange', value: 1 },
  { color: 'green', value: 1 }
]
