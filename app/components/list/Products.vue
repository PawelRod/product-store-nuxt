<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <v-row align="stretch">
    <v-col
      v-for="product in products"
      :key="product.name"
      cols="12"
      md="6"
      lg="4"
    >
      <CardsProduct :product="product" />
    </v-col>
  </v-row>
</template>