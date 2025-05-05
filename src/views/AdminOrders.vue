<template>
  <div class="max-w-4xl mx-auto p-6 mt-10">
    <h2 class="text-2xl font-bold mb-6">Order List</h2>
    <table class="w-full border">
      <thead>
        <tr class="bg-gray-200">
          <th class="p-2 border">Name</th>
          <th class="p-2 border">Phone</th>
          <th class="p-2 border">Email</th>
          <th class="p-2 border">Date</th>
          <th class="p-2 border">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id" class="border">
          <td class="p-2 border">{{ order.name }}</td>
          <td class="p-2 border">{{ order.phone }}</td>
          <td class="p-2 border">{{ order.email }}</td>
          <td class="p-2 border">{{ order.pickupDate }}</td>
          <td class="p-2 border">{{ order.pickupTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const orders = ref([])

onMounted(async () => {
  const token = localStorage.getItem('admin_token')
  if (!token) {
    router.push('/admin/login')
    return
  }

  try {
    const res = await fetch('http://localhost:5000/api/orders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.status === 401) {
      localStorage.removeItem('admin_token')
      router.push('/admin/login')
      return
    }

    orders.value = await res.json()
  } catch (err) {
    console.error('Failed to fetch orders', err)
  }
})
</script>
