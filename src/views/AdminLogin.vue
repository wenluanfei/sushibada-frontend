<template>
  <div class="max-w-md mx-auto p-6 mt-10 border rounded">
    <h2 class="text-xl font-bold mb-4">Admin Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" class="w-full border p-2 mb-4" required />
      <input v-model="password" type="password" placeholder="Password" class="w-full border p-2 mb-4" required />
      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">Login</button>
    </form>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }) 
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem('admin_token', data.token)
      router.push('/admin/orders')
    } else {
      alert(data.message || 'Login failed')
    }
  } catch (error) {
    console.error('❌ Login error:', error)
    alert('Server not reachable')
  }
}

</script>
