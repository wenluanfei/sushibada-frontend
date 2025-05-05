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
      📧 Confirmation email sent to <strong>{{ reservation.email }}</strong>
    </p>

    <!-- 邮箱更改与重发区域 -->
    <div class="mt-6 text-left">
      <label class="block mb-1 font-semibold">Want to resend the email or fix the email address?</label>
      <input
        type="email"
        v-model="overrideEmail"
        class="border p-2 rounded w-full mb-2"
        placeholder="Enter a new email address"
      />
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        @click="resendEmail"
      >
        📧 Resend Confirmation Email
      </button>
    </div>
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
const overrideEmail = ref('') // 用户输入的新邮箱

onMounted(() => {
  const data = localStorage.getItem('reservation')
  const emailFlag = localStorage.getItem('email_sent')
  const orderFlag = localStorage.getItem('order_saved') // 🔧 新增标志位，防止重复保存

  if (data) {
    reservation.value = JSON.parse(data)
    overrideEmail.value = reservation.value.email

    // 1️⃣ 发送确认邮件
    if (!emailFlag) {
      sendEmail(reservation.value.email)
    } else {
      emailSent.value = true
    }

    // 2️⃣ 保存订单到后端数据库（只执行一次）
    if (!orderFlag) {
      fetch('http://localhost:5000/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservation.value)
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('✅ Order saved to backend:', data)
          localStorage.setItem('order_saved', 'true') // 防止重复保存
        })
        .catch((err) => {
          console.error('❌ Failed to save order:', err)
        })
    }
  }
})

// 默认发邮件函数
function sendEmail(targetEmail: string) {
  const templateParams = {
    to_name: reservation.value.name,
    to_email: targetEmail,
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
      localStorage.setItem('email_sent', 'true')
      reservation.value.email = targetEmail // 更新展示用邮箱
      console.log('✅ Email sent to', targetEmail)
    })
    .catch((error) => {
      console.error('❌ EmailJS error:', error)
    })
}

// 点击“重新发送”按钮
function resendEmail() {
  if (!overrideEmail.value) {
    alert('Please enter a valid email address.')
    return
  }
  sendEmail(overrideEmail.value)
}
</script>
