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

      <div class="flex gap-2 mt-3">
        <button
          class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          @click="openEditModal(order)"
        >
          ✏️ Edit
        </button>
        <button
          class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          @click="deleteOrder(order._id)"
        >
          🗑️ Delete
        </button>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded w-full max-w-lg shadow-lg relative">
        <h3 class="text-xl font-semibold mb-4">Edit Order</h3>
        <label class="block mb-2">Name:</label>
        <input v-model="editForm.name" class="border p-2 w-full mb-3 rounded" />

        <label class="block mb-2">Phone:</label>
        <input v-model="editForm.phone" class="border p-2 w-full mb-3 rounded" />

        <label class="block mb-2">Email:</label>
        <input v-model="editForm.email" class="border p-2 w-full mb-3 rounded" />

        <label class="block mb-2">Notes:</label>
        <textarea v-model="editForm.notes" class="border p-2 w-full mb-4 rounded"></textarea>

        <div class="flex justify-end gap-2">
          <button @click="showModal = false" class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
          <button @click="submitEdit" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

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
const showModal = ref(false)
const editForm = ref<Partial<Order>>({})
const router = useRouter()

const openEditModal = (order: Order) => {
  editForm.value = { ...order }
  showModal.value = true
}

const submitEdit = async () => {
  const token = localStorage.getItem('admin_token')
  if (!token || !editForm.value._id) return

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/orders/${editForm.value._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editForm.value),
    })

    if (res.ok) {
      const updated = await res.json()
      const index = orders.value.findIndex(o => o._id === updated._id)
      if (index !== -1) orders.value[index] = updated
      showModal.value = false
    } else {
      alert('Failed to update order')
    }
  } catch (error) {
    console.error('❌ Edit order error:', error)
  }
}

const deleteOrder = async (id: string) => {
  if (!confirm('Are you sure you want to delete this order?')) return

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/orders/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
      },
    })

    if (res.ok) {
      orders.value = orders.value.filter(order => order._id !== id)
    } else {
      alert('Failed to delete order')
    }
  } catch (error) {
    console.error('❌ Delete order error:', error)
  }
}

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
