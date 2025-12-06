export interface Filters {
  categories: string[]
  manufacturers: string[]
  selectedCategory: string | null
  selectedManufacturer: string | null
  priceRange: [number, number]
  minPrice: number
  maxPrice: number
}