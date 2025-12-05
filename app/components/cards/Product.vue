<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{
  product: Product
}>()
</script>

<template>
  <v-card
    class="d-flex flex-column h-100 pa-4"
    elevation="2"
  >
    <v-card-title class="text-h6">
      {{ product.name }}
    </v-card-title>
    <v-card-subtitle class="mb-2">
      {{ product.manufacturer }}
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
</template>