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
        <label class="font-semibold block mb-1">Pickup Date *</label>
        <input
          type="date"
          v-model="store.pickupDate"
          class="w-full border p-2 rounded"
          :min="minDate"
          required
        />
      </div>

      <div>
        <label class="font-semibold block mb-1">Pickup Time *</label>
        <input
          type="time"
          v-model="store.pickupTime"
          class="w-full border p-2 rounded"
          min="10:00"
          max="16:00"
          required
        />
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
        <p v-if="store.selectedSushi.length === 0" class="text-sm text-red-500 mt-1">
          Please select at least one item.
        </p>
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

// 设置可选日期为明天起
const today = new Date()
today.setDate(today.getDate() + 1)
const minDate = today.toISOString().split('T')[0]

// 初始化字段
store.pickupDate = ''
store.pickupTime = ''
store.pickupCode = '' // 新增字段

const sushiOptions = [
  'Salmon Avo Roll',
  'Tuna Roll',
  'Tuna Avo Roll',
  'Avocado Roll',
  'Tempura Veg Roll',
  'Avo Roll',
  'Teriyaki Roll',
  'Chincken Avo Roll'
]

async function handleSubmit() {
  if (!store.name || !store.phone || !store.email) {
    alert('Please fill all required fields.')
    return
  }

  if (!store.pickupDate || !store.pickupTime) {
    alert('Please select a pickup date and time.')
    return
  }

  const [hourStr] = store.pickupTime.split(':')
  const hour = parseInt(hourStr)
  if (hour < 10 || hour > 16) {
    alert('Pickup time must be between 10:00 AM and 4:00 PM.')
    return
  }

  if (store.type === 'custom' && store.selectedSushi.length === 0) {
    alert('Please select at least one sushi for your custom platter.')
    return
  }

  try {
    const response = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        size: store.size,
        name: store.name,
        phone: store.phone,
        email: store.email,
        notes: store.notes,
        pickupDate: store.pickupDate,
        pickupTime: store.pickupTime,
        selectedSushi: store.selectedSushi,
        type: store.type
      }),
    })

const data = await response.json()

if (data?.url && data?.pickupCode) {
  store.pickupCode = data.pickupCode // ✅ 保存 session.id 作为唯一码
  localStorage.setItem('reservation', JSON.stringify(store.$state))
  window.location.href = data.url
}

  else {
      alert('Stripe checkout failed to generate URL.')
    }
  } catch (error) {
    console.error('Stripe checkout error:', error)
    alert('Failed to connect to payment server.')
  }
}

</script>
