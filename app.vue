<script setup>
  import 'primeicons/primeicons.css'

</script>
<template>
  <VitePwaManifest/>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
<style>
  html{
    @apply bg-primary-900;
    @apply text-slate-300;
  }

  input[type="number"]{
    appearance: textfield;
    -webkit-appearance: textfield; 
  }
</style>