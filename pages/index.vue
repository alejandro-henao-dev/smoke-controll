<script setup lang="ts">
  const { timeToAdd, maxCigars } = useConfig()
  const cigarsRepo = useCigarsStore()
  const {lastCigar,update:updateLastCigar} = useLastCigar()
  const {dayCigars,update:updateDayCigars} = useDayCigars(new Date())
  
  const onSmoke = async () => {
    await cigarsRepo.insert(new Date())
    updateLastCigar()
    updateDayCigars()
  }
</script>
<template>

  

  <div class="flex flex-col items-center justify-center h-dvh">
    <NuxtLink class="absolute right-0 top-0 p-4 text-xl" href="/config">
      <IconConfig/>
    </NuxtLink>
    
    <SmokeTimer
      :maxCigars="maxCigars"  
      :lastCigarTime="lastCigar?.date"
      :timeToAdd="timeToAdd" 
      :dayCigars="dayCigars" 
      @onSmoke="onSmoke" 
    />

    <div class="mt-6 font-bold text-xl font-mono bg-slate-950 w-max text-center p-2 ">
      {{ dayCigars?.length }} / {{ maxCigars }}
    </div>
  </div>
  
</template>