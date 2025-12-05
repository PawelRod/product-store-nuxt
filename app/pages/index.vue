<script setup lang="ts">
const search = ref('')
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <!-- Filters... -->
          </v-col>
          <v-col cols="12" md="9">
            <v-text-field
              v-model="search"
              label="Search for products..."
              variant="outlined"
              prepend-inner-icon="mdi-magnify"
              clearable
              autofocus
              class="mb-4"
            />
            <!-- Products... -->
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>