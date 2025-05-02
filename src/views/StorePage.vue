<script setup lang="ts">
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
</script>

<template>
  <section class="py-12 px-6 text-center bg-white text-sushibada-red">
    <h2 class="text-3xl font-bold text-sushibada-gold mb-4">📍 Our Store</h2>
    <p class="text-lg mb-6">Come pick up your platter in person!</p>

    <div class="max-w-2xl mx-auto space-y-4">
      <!-- 地址等信息略 -->

      <div class="mt-6">
        <iframe
          class="w-full h-64 rounded shadow"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          :src="`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=SushiBada+Oxenford+QLD+Australia`"
        ></iframe>
      </div>
    </div>
  </section>
</template>

