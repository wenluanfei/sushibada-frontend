<template>
  <div class="max-w-6xl mx-auto p-6">
    <h2 class="text-3xl font-bold mb-6">🍣 Our Menu</h2>

    <div v-if="loading">Loading menu...</div>
    <div v-else-if="menuItems.length === 0">No menu items found.</div>

    <div v-else>
      <div v-for="(items, category) in groupedMenu" :key="category" class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">{{ category }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="item in items"
            :key="item._id"
            class="bg-white rounded shadow p-4"
          >
            <!-- 图片 -->
            <div class="w-full h-[250px] overflow-hidden rounded mb-2 bg-gray-100">
              <img
                v-if="item.image"
                :src="item.image"
                alt="Sushi Image"
                class="w-full h-full object-cover"
              />
            </div>



            <!-- 名称 -->
            <h4 class="text-lg font-bold">{{ item.name }}</h4>

            <!-- 描述 -->
            <p class="text-gray-600">{{ item.description || 'No description.' }}</p>

            <!-- 酱料 / 配料 -->
            <p class="text-sm text-gray-500 mt-1">Sauce: {{ item.sauce || 'N/A' }}</p>
            <p class="text-sm text-gray-500">Ingredients: {{ item.ingredients || 'N/A' }}</p>

            <!-- 价格 -->
            <p class="mt-2 font-semibold text-orange-600">
              ${{ item.price?.toFixed(2) || 'N/A' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface MenuItem {
  _id: string
  name: string
  description?: string
  category: string
  sauce?: string
  ingredients?: string
  price?: number
  image?: string
}

const menuItems = ref<MenuItem[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/menu`)
    const data = await res.json()
    menuItems.value = data.items || []
  } catch (error) {
    console.error('❌ Failed to load menu:', error)
  } finally {
    loading.value = false
  }
})

const groupedMenu = computed(() => {
  return menuItems.value.reduce((acc: Record<string, MenuItem[]>, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

})

</script>
