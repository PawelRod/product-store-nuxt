<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{
  product: Product
}>()
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props" 
      link
      class="d-flex flex-column h-100 pa-4 rounded-lg product-card"
      :class="[{'product-card--hover': isHovering}]"
      elevation="0"
      variant="outlined"
      to="/"
    >
      <v-card-title class="text-h6 text-normal mb-2">
        {{ product.name }}
      </v-card-title>
      <v-card-subtitle class="d-flex justify-space-between align-center mb-2">
        <span class="text-body-2 text-grey-darken-1 mr-2">
          {{ product.manufacturer }}
        </span>
        <v-chip
          variant="outlined"
          density="compact"
          class="text-caption"
        >
          {{ product.category }}
        </v-chip>
      </v-card-subtitle>
      <v-card-text class="mb-4">
        <div class="text-body-2">
          {{ product.description }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-chip
          color="primary"
          class="ml-auto pl-4"
          prepend-icon="mdi-cash-multiple"
        >
          {{ product.price }} PLN
        </v-chip>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<style lang="scss" scoped>
.product-card {
  transition: transform .18s ease;
}
.product-card--hover {
  transform: translateY(-3px);
}
</style>