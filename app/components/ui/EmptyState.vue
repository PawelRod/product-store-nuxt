<script setup lang="ts">
import type { EmptyStateProps } from '~/types/ui'

defineProps<EmptyStateProps>()
</script>

<template>
  <div class="text-center pa-10 d-flex flex-column align-center justify-center">
    <v-icon
      icon="mdi-magnify"
      size="64"
      color="primary"
      class="mb-4"
    />
    <p class="text-h6 mb-2">
      {{ title }}
    </p>
    <p class="text-body-2 mb-6">
      {{ message }}
    </p>
    <slot />
  </div>
</template>