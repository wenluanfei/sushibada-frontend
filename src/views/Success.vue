<template>
  <div class="min-h-screen flex items-center justify-center bg-sushibada-soft px-4 py-20">
    <div class="bg-white shadow-xl rounded-lg p-8 max-w-xl text-center">
      <h2 class="text-3xl font-bold text-green-600 mb-4">✅ Payment Successful!</h2>
      <p class="text-lg text-gray-700 mb-6">
        Thank you for reserving your sushi platter with SushiBada. We've received your order and will contact you shortly to confirm the details.
      </p>

      <router-link
        to="/"
        class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition"
      >
        Back to Home
      </router-link>
    </div>
  </div>
</template>
