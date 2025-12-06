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
            <div class="d-flex justify-end align-center mb-4">
              <p class="text-body-2 text-grey mr-auto">
                Showing {{ filteredProducts.length }} of {{ products.length }} products
              </p>
              <v-btn
                variant="tonal"
                color="primary"
                class="mr-4"
                @click="
                  search = '';
                  selectedCategory = null;
                  selectedManufacturer = null;
                  priceRange = [minPrice, maxPrice];
                  sortBy = null;
                "
              >
                Clear filters
              </v-btn>
              <v-select
                :items="[
                  { title: 'Cheapest first', value: 'asc' },
                  { title: 'Most expensive first', value: 'desc' }
                ]"
                v-model="sortBy"
                variant="outlined"
                density="compact"
                hide-details
                style="max-width: 220px"
                label="Sort by"
                clearable
              />
            </div>
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
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>