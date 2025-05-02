<template>
  <div class="max-w-xl mx-auto p-6 text-center">
    <h2 class="text-2xl font-bold text-green-600 mb-4">🎉 Thank you for your payment!</h2>

    <div class="text-left bg-white p-4 rounded shadow mb-6">
      <p><strong>Name:</strong> {{ reservation.name }}</p>
      <p><strong>Phone:</strong> {{ reservation.phone }}</p>
      <p><strong>Email:</strong> {{ reservation.email }}</p>
      <p><strong>Date:</strong> {{ reservation.pickupDate }}</p>
      <p><strong>Time:</strong> {{ reservation.pickupTime }}</p>
      <p><strong>Size:</strong> {{ reservation.size }} ({{ reservation.type }})</p>
      <p v-if="reservation.type === 'custom' && reservation.selectedSushi.length">
        <strong>Sushi:</strong> {{ reservation.selectedSushi.join(', ') }}
      </p>
      <p v-if="reservation.notes"><strong>Notes:</strong> {{ reservation.notes }}</p>
    </div>

    <p class="text-green-700" v-if="emailSent">
      📧 Confirmation email sent to {{ reservation.email }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import emailjs from '@emailjs/browser'

interface Reservation {
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

const SERVICE_ID = 'service_hs7yetf'
const TEMPLATE_ID = 'template_gps0swa'
const PUBLIC_KEY = 'F7cV3O3qDLzcVAlTy'

const reservation = ref<Reservation>({
  name: '',
  phone: '',
  email: '',
  pickupDate: '',
  pickupTime: '',
  size: 'regular',
  type: 'mix',
  selectedSushi: [],
  notes: ''
})
const emailSent = ref(false)

onMounted(() => {
  const data = localStorage.getItem('reservation')
  if (data) {
    reservation.value = JSON.parse(data)
    sendEmail()
  }
})

function sendEmail() {
  const templateParams = {
    to_name: reservation.value.name,
    to_email: reservation.value.email,
    pickup_date: reservation.value.pickupDate,
    pickup_time: reservation.value.pickupTime,
    phone: reservation.value.phone,
    size: reservation.value.size,
    type: reservation.value.type
  }


  if (!templateParams.to_name || !templateParams.to_email) {
    console.error('❌ Missing required fields for email:', templateParams)
    return
  }

  emailjs
    .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
    .then(() => {
      emailSent.value = true
      console.log('✅ Email sent to', reservation.value.email)
    })
    .catch((error) => {
      console.error('❌ EmailJS error:', error)
    })
}
</script>
