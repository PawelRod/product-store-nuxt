<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const { products, isLoading } = useProducts()
const search = ref('')

const filteredProducts = computed(() => {
  return products.value.filter(p => 
    p.name.toLowerCase().includes(search.value.toLowerCase()) ||
    p.description.toLowerCase().includes(search.value.toLowerCase()) ||
    p.manufacturer.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="px-4 px-md-8">
        <v-row>
          <v-col cols="12" md="3">
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