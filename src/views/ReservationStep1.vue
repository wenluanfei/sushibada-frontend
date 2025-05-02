<template>
  <div class="max-w-xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4 text-orange-600">🥡 Choose Your Party Platter</h2>

    <div class="mb-4">
      <label class="block font-semibold mb-2">Platter Size:</label>
      <div class="space-x-4">
        <label><input type="radio" value="small" v-model="store.size" /> Small</label>
        <label><input type="radio" value="large" v-model="store.size" /> Large</label>
      </div>
    </div>

    <div class="mb-6">
      <label class="block font-semibold mb-2">Platter Type:</label>
      <div class="space-x-4">
        <label><input type="radio" value="mix" v-model="store.type" /> Mix</label>
        <label><input type="radio" value="custom" v-model="store.type" /> Custom</label>
      </div>
    </div>

    <button
      class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      :disabled="!store.size || !store.type"
      @click="router.push('/reserve/info')"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useReservationStore } from '../store/reservation'

const store = useReservationStore()
const router = useRouter()
</script>
