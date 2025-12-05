<script setup lang="ts">
import type { EmptyStateProps } from '~/types/ui'

defineProps<{
  emptyState?: EmptyStateProps
}>()
</script>

<template>
  <div class="text-center pa-10 d-flex flex-column align-center justify-center">
    <v-icon
      :icon="emptyState?.icon ?? 'mdi-magnify'"
      size="64"
      color="primary"
      class="mb-4"
    />
    <p class="text-h6 mb-2">
      {{ emptyState?.title ?? 'No products found' }}
    </p>
    <p class="text-body-2 mb-6">
      {{ emptyState?.message ?? 'Try adjusting your search pharse' }}
    </p>
    <slot />
  </div>
</template>