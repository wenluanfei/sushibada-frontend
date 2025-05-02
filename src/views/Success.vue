<template>
  <div class="max-w-xl mx-auto p-6 text-center">
    <h2 class="text-2xl font-bold text-green-600 mb-4">🎉 Thank you for your payment!</h2>
    <p class="text-lg mb-4">Your pickup code is:</p>
    <p class="text-3xl font-mono font-bold text-orange-500 mb-6">{{ reservation.pickupCode }}</p>

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

// 类型定义
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
  pickupCode: string
}

// EmailJS 配置
const SERVICE_ID = 'service_3tcpksf'
const TEMPLATE_ID = 'template_gps0swa'
const PUBLIC_KEY = 'F7cV3O3qDLzcVAlTy'

// 状态
const reservation = ref<Reservation>({
  name: '',
  phone: '',
  email: '',
  pickupDate: '',
  pickupTime: '',
  size: 'regular',
  type: 'mix',
  selectedSushi: [],
  notes: '',
  pickupCode: ''
})
const emailSent = ref(false)

// 页面加载时读取预约信息 & 发邮件
onMounted(() => {
  const data = localStorage.getItem('reservation')
  if (data) {
    const parsed = JSON.parse(data)
    reservation.value = parsed
    sendEmail()
  }
})

// 邮件发送逻辑
function sendEmail() {
  const templateParams = {
    name: reservation.value.name,
    email: reservation.value.email,
    phone: reservation.value.phone,
    pickupCode: reservation.value.pickupCode,
    pickupDate: reservation.value.pickupDate,
    pickupTime: reservation.value.pickupTime,
    size: reservation.value.size,
    type: reservation.value.type,
    sushi: reservation.value.selectedSushi?.join(', ') || '',
    notes: reservation.value.notes || ''
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
