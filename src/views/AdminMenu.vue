<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">📋 Menu Management</h2>

    <!-- Add New Item Form -->
    <form @submit.prevent="addMenuItem" class="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded mb-6">
      <input v-model="newItem.name" placeholder="Name" class="border p-2 rounded" required />
      <select v-model="newItem.category" class="border p-2 rounded" required>
        <option disabled value="">Select Category</option>
        <option>Roll</option>
        <option>Nigiri</option>
        <option>Rice Bowl</option>
        <option>Snacks</option>
        <option>Drinks</option>
        <option>Special</option>
      </select>
      <input v-model="newItem.size" placeholder="Size (optional)" class="border p-2 rounded" />
      <input v-model="newItem.sauce" placeholder="Sauce (optional)" class="border p-2 rounded" />
      <input v-model="newItem.ingredients" placeholder="Ingredients (optional)" class="border p-2 rounded col-span-2" />
      <button type="submit" class="bg-green-600 text-white py-2 rounded col-span-2">➕ Add Item</button>
    </form>

    <!-- Menu List -->
    <div v-if="menu.length === 0">No items found.</div>
    <div
      v-else
      v-for="item in menu"
      :key="item._id"
      class="bg-white shadow p-4 rounded mb-4"
    >
      <p><strong>Name:</strong> {{ item.name }}</p>
      <p><strong>Category:</strong> {{ item.category }}</p>
      <p v-if="item.size"><strong>Size:</strong> {{ item.size }}</p>
      <p v-if="item.sauce"><strong>Sauce:</strong> {{ item.sauce }}</p>
      <p v-if="item.ingredients"><strong>Ingredients:</strong> {{ item.ingredients }}</p>

      <button
        class="mt-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        @click="deleteMenuItem(item._id)"
      >
        🗑️ Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface MenuItem {
  _id: string
  name: string
  category: string
  size?: string
  sauce?: string
  ingredients?: string
  available?: boolean
}

const menu = ref<MenuItem[]>([])
const newItem = ref({
  name: '',
  category: '',
  size: '',
  sauce: '',
  ingredients: ''
})

const fetchMenu = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/menu`)
  const data = await res.json()
  menu.value = data.menu
}

const addMenuItem = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/menu`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItem.value)
  })

  if (res.ok) {
    const added = await res.json()
    menu.value.unshift(added)
    newItem.value = { name: '', category: '', size: '', sauce: '', ingredients: '' }
  } else {
    alert('Failed to add item')
  }
}

const deleteMenuItem = async (id: string) => {
  const confirmDelete = confirm('Are you sure you want to delete this item?')
  if (!confirmDelete) return

  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/menu/${id}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    menu.value = menu.value.filter(item => item._id !== id)
  } else {
    alert('Failed to delete item')
  }
}

onMounted(() => {
  fetchMenu()
})
</script>
