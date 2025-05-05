<template>
  <div class="max-w-5xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6">📦 Order List</h2>

    <div v-if="loading">Loading orders...</div>
    <div v-else-if="orders.length === 0">No orders found.</div>

    <div
      v-else
      v-for="order in orders"
      :key="order._id"
      class="bg-white rounded shadow p-4 mb-4"
    >
      <p><strong>Name:</strong> {{ order.name }}</p>
      <p><strong>Phone:</strong> {{ order.phone }}</p>
      <p><strong>Email:</strong> {{ order.email }}</p>
      <p><strong>Date:</strong> {{ order.pickupDate }}</p>
      <p><strong>Time:</strong> {{ order.pickupTime }}</p>
      <p><strong>Size:</strong> {{ order.size }} ({{ order.type }})</p>
      <p v-if="order.type === 'custom' && order.selectedSushi.length">
        <strong>Sushi:</strong> {{ order.selectedSushi.join(', ') }}
      </p>
      <p v-if="order.notes"><strong>Notes:</strong> {{ order.notes }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// 定义 Order 类型
interface Order {
  _id: string
  name: string
  phone: string
  email: string
  pickupDate: string
  pickupTime: string
  size: 'regular' | 'large'
  type: 'mix' | 'custom'
  selectedSushi: string[]
  notes?: string
}

const orders = ref<Order[]>([])
const loading = ref(true)
const router = useRouter()

onMounted(async () => {
  const token = localStorage.getItem('admin_token')
  if (!token) {
    router.push('/admin/login')
    return
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })


    if (res.status === 401) {
      localStorage.removeItem('admin_token')
      router.push('/admin/login')
      return
    }

    const data = await res.json()
    orders.value = data.orders
  } catch (error) {
    console.error('❌ Failed to fetch orders:', error)
  } finally {
    loading.value = false
  }
})
</script>
