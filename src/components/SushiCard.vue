<template>
  <div class="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between h-full">
    <div class="aspect-[3/2] w-full overflow-hidden rounded">
      <img :src="image" :alt="name" class="w-full h-full object-cover" />
    </div>
    <h3 class="mt-4 text-lg font-semibold text-sushibada-red">{{ name }}</h3>
    <p class="text-sm text-gray-600 mt-1">{{ description }}</p>
    <div class="mt-4 text-sushibada-gold font-bold text-right text-base">
      ${{ price.toFixed(2) }}
    </div>
  </div>
</template>


<script setup lang="ts">
const { name, price, image, description } = defineProps<{
  name: string
  image: string
  price: number
  description: string
}>()
</script>
