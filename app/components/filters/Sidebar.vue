<script setup lang="ts">
defineProps<{
  categories: string[]
  manufacturers: string[]
  selectedCategory: string | null
  selectedManufacturer: string | null
  priceRange: [number, number]
  minPrice: number
  maxPrice: number
}>()

const emit = defineEmits([
  'update:selectedCategory',
  'update:selectedManufacturer',
  'update:priceRange'
])
</script>

<template>
  <v-select
    :items="categories"
    :model-value="selectedCategory"
    variant="outlined"
    clearable
    label="Category"
    @update:model-value="emit('update:selectedCategory', $event)"
  />
  <v-divider class="mb-6" />
  <v-select
    :items="manufacturers"
    :model-value="selectedManufacturer"
    variant="outlined"
    clearable
    label="Manufacturer"
    @update:model-value="emit('update:selectedManufacturer', $event)"
  />
  <v-divider class="mb-12" />
  <div v-if="maxPrice > 0">
    <v-range-slider
      :model-value="priceRange"
      :min="minPrice"
      :max="maxPrice"
      step="10"
      thumb-label="always"
      color="primary"
      hide-details
      @update:model-value="emit('update:priceRange', $event)"
    />
    <label class="text-body-2 mb-2 d-block">
      Price range (PLN)
    </label>
  </div>
</template>