<template>
  <section
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 0.8 } }"
    class="py-12 px-6 bg-sushibada-soft text-sushibada-red"
  >
    <h2 class="text-3xl font-bold text-sushibada-gold text-center mb-8">🍽️ Our Menu</h2>

    <div v-for="section in menuSections" :key="section.category" class="mb-12">
      <h3 class="text-2xl font-semibold mb-4">{{ section.category }}</h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
        <div
          v-for="item in section.items"
          :key="item.name"
          v-motion
          :hover="{ scale: 1.03 }"
          class="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
        >
          <img :src="item.image" :alt="item.name" class="w-full h-40 object-cover rounded" />
          <h4 class="mt-2 text-lg font-bold">{{ item.name }}</h4>
          <p class="text-sm text-gray-600" v-if="item.description">{{ item.description }}</p>
          <div class="mt-2 text-sushibada-gold font-semibold" v-if="item.price">
            ${{ item.price.toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface MenuItem {
  name: string
  image: string
  description?: string
  price?: number
}

const menuSections = ref<{ category: string; items: MenuItem[] }[]>([])

onMounted(async () => {
  const res = await fetch('/src/data/menu.json')
  const data = await res.json()

  menuSections.value = Object.keys(data).map(category => ({
    category,
    items: data[category]
  }))
})
</script>
