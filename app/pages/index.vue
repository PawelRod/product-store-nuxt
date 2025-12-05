<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const { products, isLoading } = useProducts()

const search = ref('')
const selectedCategory = ref<string | null>(null)
const selectedManufacturer = ref<string | null>(null)
const priceRange = ref<[number, number]>([0, 0])

const minPrice = computed(() =>
  products.value.length > 0 ? Math.min(...products.value.map(p => p.price)) : 0
)
const maxPrice = computed(() =>
  products.value.length > 0 ? Math.max(...products.value.map(p => p.price)) : 0
)
const categories = computed(() => {
  return [...new Set(products.value.map(p => p.category))]
})
const manufacturers = computed(() => {
  return [...new Set(products.value.map(p => p.manufacturer))]
})
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

  result = result.filter(p => 
    p.price >= priceRange.value[0] &&
    p.price <= priceRange.value[1]
  )

  return result
})

watch(
  () => products.value,
  () => {
    if (products.value.length > 0) {
      priceRange.value = [minPrice.value, maxPrice.value]
    }
  },
  { immediate: true }
)
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="px-4 px-md-8">
        <v-row>
          <v-col
            cols="12"
            md="3"
            class="pr-12"
          >
            <FiltersSidebar
              :categories="categories"
              :manufacturers="manufacturers"
              :selected-category="selectedCategory"
              :selected-manufacturer="selectedManufacturer"
              :price-range="priceRange"
              :max-price="maxPrice"
              :min-price="minPrice"
              @update:selected-category="selectedCategory = $event"
              @update:selected-manufacturer="selectedManufacturer = $event"
              @update:price-range="priceRange = $event"
            />
          </v-col>
          <v-col cols="12" md="9">
            <v-text-field
              v-model="search"
              label="Search for products..."
              variant="outlined"
              prepend-inner-icon="mdi-magnify"
              clearable
              @click:clear="search = ''"
              autofocus
              class="mb-4"
            />
            <p class="text-body-2 text-grey mb-4">
              Showing {{ filteredProducts.length }} of {{ products.length }} products
            </p>
            <v-progress-circular
              v-if="isLoading"
              indeterminate
              color="primary"
              size="60"
              width="7"
              class="ma-8 d-flex mx-auto"
            />
            <ListProducts
              v-else-if="filteredProducts.length > 0"
              :products="filteredProducts"
            />
            <UiEmptyState
              v-else
            >
              <v-btn
                variant="tonal"
                color="primary"
                @click="search = ''">
                Clear search
              </v-btn>
            </UiEmptyState>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>