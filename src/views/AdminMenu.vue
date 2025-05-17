<template>
  <div class="max-w-6xl mx-auto p-6">
    <h2 class="text-3xl font-bold mb-6">🍣 Menu Management</h2>

    <!-- 添加新菜单项表单 -->
    <form @submit.prevent="handleAdd" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 bg-white p-4 rounded shadow">
      <input v-model="form.name" type="text" placeholder="Name" required class="border p-2 rounded" />
      <select v-model="form.category" required class="border p-2 rounded">
        <option disabled value="">Select Category</option>
        <option>Roll</option>
        <option>Nigiri</option>
        <option>Rice Bowl</option>
        <option>Snacks</option>
        <option>Drinks</option>
        <option>Special</option>
      </select>
      <input v-model="form.size" type="text" placeholder="Size (optional)" class="border p-2 rounded" />
      <input v-model="form.sauce" type="text" placeholder="Sauce (optional)" class="border p-2 rounded" />
      <input v-model="form.ingredients" type="text" placeholder="Ingredients (optional)" class="border p-2 rounded" />
      <input v-model.number="form.price" type="number" step="0.1" placeholder="Price" required class="border p-2 rounded" />
      <input type="file" @change="handleImage" class="col-span-1 md:col-span-2" />
      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded col-span-1 md:col-span-2">➕ Add Item</button>
    </form>

    <!-- 加载状态 -->
    <div v-if="loading">Loading...</div>
    <div v-else-if="items.length === 0">No menu items found.</div>

    <!-- 分组展示菜单项 -->
    <div v-else>
      <div v-for="(group, category) in groupedItems" :key="category" class="mb-10">
        <h3 class="text-xl font-bold mb-4">{{ category }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="item in group" :key="item._id" class="bg-white rounded shadow p-4">
            <p class="font-bold">{{ item.name }}</p>
            <p class="text-sm text-gray-600">${{ item.price.toFixed(2) }}</p>
            <p v-if="item.ingredients" class="text-sm text-gray-500">Ingredients: {{ item.ingredients }}</p>
            <p v-if="item.size" class="text-sm text-gray-500">Size: {{ item.size }}</p>
            <p v-if="item.sauce" class="text-sm text-gray-500">Sauce: {{ item.sauce }}</p>
            <img
              v-if="item.image"
              :src="getImageUrl(item.image)"
              class="w-full h-48 object-cover mt-2 rounded"
              alt="Sushi Image"
            />
            <div class="flex gap-2 mt-4 justify-end">
              <button class="bg-yellow-500 text-white px-3 py-1 rounded" @click="openEdit(item)">✏️ Edit</button>
              <button class="bg-red-600 text-white px-3 py-1 rounded" @click="deleteItem(item._id)">🗑️ Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑弹窗 -->
    <div v-if="editingItem" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">✏️ Edit Menu Item</h3>
        <input v-model="editForm.name" type="text" placeholder="Name" class="border p-2 w-full mb-2" />
        <input v-model.number="editForm.price" type="number" placeholder="Price" class="border p-2 w-full mb-2" />
        <input v-model="editForm.ingredients" type="text" placeholder="Ingredients" class="border p-2 w-full mb-2" />
        <input v-model="editForm.size" type="text" placeholder="Size" class="border p-2 w-full mb-2" />
        <input v-model="editForm.sauce" type="text" placeholder="Sauce" class="border p-2 w-full mb-2" />
        <select v-model="editForm.category" class="border p-2 w-full mb-2">
          <option>Roll</option>
          <option>Nigiri</option>
          <option>Rice Bowl</option>
          <option>Snacks</option>
          <option>Drinks</option>
          <option>Special</option>
        </select>
        <div class="flex justify-end gap-2 mt-4">
          <button @click="updateItem" class="bg-green-600 text-white px-3 py-1 rounded">💾 Save</button>
          <button @click="editingItem = null" class="bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
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
  category: string
  size?: string
  sauce?: string
  ingredients?: string
  price: number
  image?: string
}

const items = ref<MenuItem[]>([])
const loading = ref(true)

const form = ref({
  name: '',
  category: '',
  size: '',
  sauce: '',
  ingredients: '',
  price: 0,
})
const imageFile = ref<File | null>(null)

const editingItem = ref<MenuItem | null>(null)
const editForm = ref({ ...form.value })

const token = localStorage.getItem('admin_token')

const getImageUrl = (url: string) => url.startsWith('http') ? url : `${import.meta.env.VITE_API_BASE_URL}${url}`

const fetchItems = async () => {
  loading.value = true
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/menu`)
    const data = await res.json()
    items.value = data.items || []
  } catch (err) {
    console.error('❌ Failed to fetch menu:', err)
  } finally {
    loading.value = false
  }
}
onMounted(fetchItems)

const handleImage = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    imageFile.value = target.files[0]
  }
}

const handleAdd = async () => {
  const body = new FormData()
  Object.entries(form.value).forEach(([key, value]) => body.append(key, value.toString()))
  if (imageFile.value) {
    body.append('image', imageFile.value)
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/menu`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    })
    if (res.ok) {
      form.value = { name: '', category: '', size: '', sauce: '', ingredients: '', price: 0 }
      imageFile.value = null
      await fetchItems()
    } else {
      alert('Failed to add item')
    }
  } catch (err) {
    console.error('❌ Add item error:', err)
  }
}

const deleteItem = async (id: string) => {
  if (!confirm('Are you sure to delete this item?')) return
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/menu/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.ok) await fetchItems()
    else alert('Delete failed')
  } catch (err) {
    console.error('❌ Delete item error:', err)
  }
}

const openEdit = (item: MenuItem) => {
  editingItem.value = { ...item }
  editForm.value = { ...item }
}

const updateItem = async () => {
  if (!editingItem.value) return

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/menu/${editingItem.value._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editForm.value),
    })
    if (res.ok) {
      editingItem.value = null
      await fetchItems()
    } else {
      alert('Update failed')
    }
  } catch (err) {
    console.error('❌ Update error:', err)
  }
}

// 分类分组
const groupedItems = computed(() => {
  const order = ['Roll', 'Nigiri', 'Rice Bowl', 'Snacks', 'Drinks', 'Special']
  const grouped = items.value.reduce((acc: Record<string, MenuItem[]>, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  const sorted: Record<string, MenuItem[]> = {}
  for (const category of order) {
    if (grouped[category]) {
      sorted[category] = grouped[category]
    }
  }

  return sorted
})

</script>
