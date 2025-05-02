<template>
  <div class="min-h-screen flex items-center justify-center bg-sushibada-soft px-4 py-20">
    <div class="bg-white shadow-xl rounded-lg p-8 max-w-xl text-center">
      <h2 class="text-3xl font-bold text-red-600 mb-4">❌ Payment Cancelled</h2>
      <p class="text-lg text-gray-700 mb-6">
        It looks like you didn't complete the reservation payment. No worries—you can always try again!
      </p>

      <router-link
        to="/reserve"
        class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition"
      >
        Try Again
      </router-link>
    </div>
  </div>
</template>
