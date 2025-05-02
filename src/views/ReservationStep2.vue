<template>
  <div class="max-w-xl mx-auto p-6">
    <h2 class="text-2xl font-bold text-orange-600 mb-4">📋 Reservation Details</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="font-semibold block mb-1">Name *</label>
        <input v-model="store.name" required class="w-full border p-2 rounded" />
      </div>

      <div>
        <label class="font-semibold block mb-1">Phone *</label>
        <input v-model="store.phone" required class="w-full border p-2 rounded" />
      </div>

      <div>
        <label class="font-semibold block mb-1">Email *</label>
        <input v-model="store.email" type="email" required class="w-full border p-2 rounded" />
      </div>

      <div>
        <label class="font-semibold block mb-1">Notes</label>
        <textarea v-model="store.notes" class="w-full border p-2 rounded"></textarea>
      </div>

      <div v-if="store.type === 'custom'">
        <label class="font-semibold block mb-2">Select Sushi Rolls *</label>
        <div class="grid grid-cols-2 gap-2">
          <label v-for="item in sushiOptions" :key="item" class="flex items-center space-x-2">
            <input type="checkbox" :value="item" v-model="store.selectedSushi" />
            <span>{{ item }}</span>
          </label>
        </div>
        <p v-if="store.selectedSushi.length === 0" class="text-sm text-red-500 mt-1">Please select at least one item.</p>
      </div>

      <button
        type="submit"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit Reservation & Pay
      </button>

    </form>
  </div>
</template>

<script setup lang="ts">
import { useReservationStore } from '../store/reservation'

const store = useReservationStore()


const sushiOptions = [
  'Salmon Roll',
  'Tuna Roll',
  'Eel Nigiri',
  'Avocado Maki',
  'Shrimp Tempura',
  'California Roll'
]

async function handleSubmit() {
  if (!store.name || !store.phone || !store.email) {
    alert('Please fill all required fields.')
    return
  }

  if (store.type === 'custom' && store.selectedSushi.length === 0) {
    alert('Please select at least one sushi for your custom platter.')
    return
  }

  // 🧾 准备 Stripe Checkout 请求
  try {
    const response = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ size: store.size }),
    })

    const data = await response.json()

    if (data?.url) {
      // ✅ 跳转到 Stripe 支付页面
      window.location.href = data.url
    } else {
      alert('Stripe checkout failed to generate URL.')
    }
  } catch (error) {
    console.error('Stripe checkout error:', error)
    alert('Failed to connect to payment server.')
  }
}


</script>
