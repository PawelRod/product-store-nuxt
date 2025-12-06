<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'
import { useFilters } from '~/composables/useFilters'

const { products, isLoading } = useProducts()
const {
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
} = useFilters(products)

const clearFilters = () => {
  search.value = ''
  selectedCategory.value = null
  selectedManufacturer.value = null
  priceRange.value = [minPrice.value, maxPrice.value]
  sortBy.value = null
}
const sortItems = [
  { title: 'Cheapest first', value: 'asc' },
  { title: 'Most expensive first', value: 'desc' }
]
</script>

<template>
  <v-app>
    <v-main>
      <v-container
        fluid
        class="px-4 px-md-8"
      >
        <v-row>
          <v-col
            cols="12"
            md="2"
            class="pr-2"
          >
            <div class="position-sticky top-0 pt-4">
              <div class="d-flex align-center mb-7">
                <v-icon
                  size="50"
                  color="amber-darken-2"
                  class="mr-2"
                >
                  mdi-weather-sunny
                </v-icon>
                <span class="text-h6 font-weight-medium mb-1">
                  product.store
                </span>
              </div>
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
            </div>
          </v-col>
          <v-col cols="12" md="10" class="px-md-9 px-2">
            <v-sheet
              color="surface"
              elevation="0"
              class="position-sticky top-0 pt-4 pb-2 topbar--z-index"
            >
              <v-text-field
                v-model="search"
                label="Search for products..."
                variant="outlined"
                prepend-inner-icon="mdi-magnify"
                clearable
                @click:clear="search = ''"
                autofocus
              />
              <v-divider class="mb-4" />
              <div class="d-flex justify-end align-center mb-4">
                <p class="text-body-2 text-grey mr-auto">
                  Showing {{ filteredProducts.length }} of {{ products.length }} products
                </p>
                <v-btn
                  variant="tonal"
                  color="primary"
                  class="mr-4"
                  style="height: 44px;"
                  @click="clearFilters"
                >
                  Clear filters
                </v-btn>
                <v-select
                  :items="sortItems"
                  v-model="sortBy"
                  variant="outlined"
                  density="compact"
                  hide-details
                  style="max-width: 220px; height: 44px;"
                  class="toolbar-input"
                  label="Sort by"
                  clearable
                />
              </div>
            </v-sheet>
            <transition name="fade">
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
                title="No products found"
                message="Try adjusting your search pharse"
              />
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
.topbar--z-index {
  z-index: 1;
}
.toolbar-input {
  height: 44px;
}
.fade-enter-active {
  transition: opacity .2s ease;
}
.fade-leave-active {
  display: none !important;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>