<template>
  <nav class="bg-sushibada-red shadow p-4 flex justify-between items-center flex-wrap">
    <h1 class="text-xl font-bold text-sushibada-gold">SushiBada</h1>

    <div class="space-x-4 flex items-center flex-wrap text-sm">
      <router-link to="/" class="text-white hover:text-sushibada-gold transition">Home</router-link>
      <router-link to="/reserve/info" class="text-white hover:text-sushibada-gold transition">Order Details</router-link>
      <router-link to="/menu" class="text-white hover:text-sushibada-gold transition">Menu</router-link>

      <router-link to="/stores" class="text-white hover:text-sushibada-gold transition">Store</router-link>

    </div>
  </nav>
</template>

