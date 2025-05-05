<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">📦 All Orders</h2>

    <div v-if="orders.length === 0" class="text-gray-500">No orders found.</div>

    <div
      v-for="order in orders"
      :key="order._id"
      class="border border-gray-300 rounded p-4 mb-4 bg-white shadow"
    >
      <p><strong>Name:</strong> {{ order.name }}</p>
      <p><strong>Phone:</strong> {{ order.phone }}</p>
      <p><strong>Email:</strong> {{ order.email }}</p>
      <p><strong>Date:</strong> {{ order.pickupDate }}</p>
      <p><strong>Time:</strong> {{ order.pickupTime }}</p>
      <p><strong>Size:</strong> {{ order.size }} ({{ order.type }})</p>
      <p v-if="order.type === 'custom' && order.selectedSushi?.length">
        <strong>Sushi:</strong> {{ order.selectedSushi.join(', ') }}
      </p>
      <p v-if="order.notes"><strong>Notes:</strong> {{ order.notes }}</p>
    </div>

    <p v-if="error" class="text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const orders = ref<any[]>([])
const error = ref('')
const router = useRouter()

onMounted(async () => {
  const token = localStorage.getItem('admin_token')
  if (!token) {
    router.push('/admin/login')
    return
  }

  try {
    const res = await fetch('http://localhost:5000/api/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.ok) {
      orders.value = await res.json()
    } else {
      error.value = '❌ Failed to fetch orders. Unauthorized?'
      if (res.status === 401) router.push('/admin/login')
    }
  } catch (err) {
    error.value = '❌ Server error. Please try again later.'
    console.error(err)
  }
})
</script>

<style scoped>
p {
  margin: 0.25rem 0;
}
</style>
