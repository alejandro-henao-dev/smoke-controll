<script setup lang="ts">
import { CigarsRepo } from '~/components/services/cigars';
  
  const { $db } = useNuxtApp()
  const cigarsRepo=new CigarsRepo($db)
  const onClick = () => {
    cigarsRepo.insert(new Date())
  }

  cigarsRepo.getLatest().then(console.log)
</script>
<template>

  

  <div class="flex flex-col items-center justify-center h-dvh">
    <NuxtLink class="absolute right-0 top-0 p-4 text-xl" href="/config">
      <IconConfig/>
    </NuxtLink>

    
    <CountDown class="mb-7" :endDate="new Date('July 2, 2024 22:30:00 GMT-5')" />


    <ButtonSmoke disabled @click="onClick"/>

    <div class="mt-6 font-bold text-xl font-mono bg-slate-950 w-24 text-center p-2">
      1 / 15
    </div>
  </div>
  
</template>