import type { Product } from '~/types/product'

export function useFilters(products: Ref<Product[]>) {
  const search = ref('')
  const selectedCategory = ref<string | null>(null)
  const selectedManufacturer = ref<string | null>(null)
  const sortBy = ref<'asc' | 'desc' | null>(null)

  const minPrice = computed(() =>
    products.value.length > 0 ? Math.min(...products.value.map(p => p.price)) : 0
  )
  const maxPrice = computed(() =>
    products.value.length > 0 ? Math.max(...products.value.map(p => p.price)) : 0
  )

  const priceRange = ref<[number, number]>([0, 0])

  watch(
    () => products.value,
    () => {
      if (products.value.length > 0) {
        priceRange.value = [minPrice.value, maxPrice.value]
      }
    },
    { immediate: true }
  )

  const categories = computed(() =>
    [...new Set(products.value.map(p => p.category))]
  )

  const manufacturers = computed(() =>
    [...new Set(products.value.map(p => p.manufacturer))]
  )

  const filteredProducts = computed(() => {
    let result = products.value

    if (search.value) {
      const s = search.value.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        p.manufacturer.toLowerCase().includes(s)
      )
    }

    if (selectedCategory.value) {
      result = result.filter(p => p.category === selectedCategory.value)
    }

    if (selectedManufacturer.value) {
      result = result.filter(p => p.manufacturer === selectedManufacturer.value)
    }

    if (sortBy.value === 'asc') {
      result = [...result].sort((a, b) => a.price - b.price)
    }

    if (sortBy.value === 'desc') {
      result = [...result].sort((a, b) => b.price - a.price)
    }

    result = result.filter(p =>
      p.price >= priceRange.value[0] &&
      p.price <= priceRange.value[1]
    )

    return result
  })

  return {
    search,
    selectedCategory,
    selectedManufacturer,
    sortBy,
    priceRange,
    minPrice,
    maxPrice,
    categories,
    manufacturers,
    filteredProducts
  }
}