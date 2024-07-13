<script setup lang="ts">
  const { timeToAdd, maxCigars } = useConfig()
  const cigarsRepo = useCigarsStore()
  const {dayCigars,update:updateDayCigars} = useDayCigars(new Date())
  
  const onSmoke = async () => {
    await cigarsRepo.insert(new Date())
    updateDayCigars()
  }
</script>
<template>

  

  <div class="flex flex-col items-center justify-center h-dvh">
    <NuxtLink class="absolute right-0 top-0 p-4 text-xl" href="/config">
      <span class="sr-only">Config</span>
      <IconConfig/>
    </NuxtLink>
    
    <SmokeTimer
      :maxCigars="maxCigars"  
      :timeToAdd="timeToAdd" 
      :dayCigars="dayCigars" 
      @onSmoke="onSmoke" 
    />

    <div class="mt-6 font-bold text-xl font-mono bg-slate-950 w-max text-center
    p-2 "
      aria-label="cigars/max"
    >
      {{ dayCigars?.length }} / {{ maxCigars }}
    </div>
  </div>
  
</template>