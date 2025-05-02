<template>
  <section
    class="bg-cover bg-center py-40 px-4 text-white text-center"
    :style="{ backgroundImage: `url(\hero-bg.jpg)` }"
  >
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl md:text-5xl font-bold mb-3 drop-shadow">Welcome to SushiBada</h1>
      <p class="text-lg md:text-xl mb-6 drop-shadow">Party Platters Crafted with Passion</p>
      <router-link
        to="/reserve"
        class="bg-sushibada-gold text-sushibada-red px-6 py-3 rounded text-lg font-semibold shadow hover:opacity-90 transition"
      >
        Reserve Now
      </router-link>
    </div>
  </section>
</template>
