<template>
  <section class="py-12 px-6 bg-white text-sushibada-red">
    <div class="max-w-4xl mx-auto">
      <!-- 标题 -->
      <h2 class="text-3xl font-bold text-sushibada-gold mb-4 text-center">📞 Connect With Us</h2>
      <p class="text-lg text-center mb-6">We’d love to hear from you!</p>

      <!-- 联系信息 -->
      <div class="bg-white p-6 rounded shadow mb-10 text-center space-y-2">
        <p>
          📍 <strong>Address:</strong>
          SushiBada, Oxenford QLD 4210
        </p>
        <p>
          📞 <strong>Phone:</strong>
          <a href="tel:+61712345678" class="text-blue-600 underline hover:text-blue-800">
            (07) 1234 5678
          </a>
        </p>
        <p>
          ✉️ <strong>Email:</strong>
          <a href="mailto:info@sushibada.com" class="text-blue-600 underline hover:text-blue-800">
            info@sushibada.com
          </a>
        </p>
        <p>
          🕒 <strong>Opening Hours:</strong>
          Mon - Wed, 8:00 AM - 4:00 PM
          Tur - Sun, 8:00 AM - 6:00 PM
        </p>
      </div>

      <!-- 地图 -->
      <div class="w-full h-64 rounded overflow-hidden shadow">
        <iframe
          class="w-full h-full"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          :src="`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=SushiBada+Oxenford+QLD+Australia`"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
</script>
