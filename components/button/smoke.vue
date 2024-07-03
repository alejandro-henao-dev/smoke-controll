<script setup lang="ts">
  const props=defineProps<{
    disabled?:boolean
  }>()
</script>
<template>

  <!-- <button 
    v-if="props.disabled"
    class="rounded-full  aspect-square w-40 bg-danger-600 flex items-center
  justify-center shadow-lg shadow-danger-900 shaddow"
  >
      <IconNoSmoke/>
  </button> -->

  <button 
    
    class="rounded-full  aspect-square w-40 bg-green-600 flex items-center
  justify-center shadow-lg shadow-green-900 shaddow"
  >
      <IconSmoke/>
  </button>
</template>