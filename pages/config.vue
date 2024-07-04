<script setup lang="ts">
import { ConfigRepo } from '~/components/store/config';

  const time = ref(0)
  const maxCigars=ref(0)
  const {$db} = useNuxtApp()

  const configRepo=new ConfigRepo($db)   
  configRepo.getTime().then((data: any) => {
   time.value= data
  })
  configRepo.getMaxCigars().then((data: any) => {
   maxCigars.value= data
  })


  watch(time, () => {
    if(isNaN(parseInt(time.value as any))) return 
    configRepo.updateTime(time.value)
  })

  watch(maxCigars, () => {
    if(isNaN(parseInt(maxCigars.value as any))) return 
    configRepo.updateMaxCigars(maxCigars.value)
  })

  const onReset = () => {
    $db.clear("cigars")
  }
</script>

<template>
  
  <div class=" border-b border-primary-600 flex items-center gap-8">
    <NuxtLink class="p-4" href="/">
      <IconArrowLeft/>
    </NuxtLink>

    <p>Settings</p>
  </div>


  <main class="mt-8 flex flex-col gap-8">
    <section class="border border-primary-700 w-max p-8 container m-auto flex flex-col gap-4" >
    

        <label class="grid grid-cols-[1fr_4rem] gap-4">
          <span class="">Minutes in between</span>
          <input name="perday" type="number"
          class=" w-16 bg-primary-950 text-center
          invalid:bg-danger-900" v-model.number="time"/>
        </label>

        <label class="grid grid-cols-[1fr_4rem] gap-4">
          <span class="">Max per day:</span>
          <input name="perday" type="number"
          class=" w-16 bg-primary-950 text-center
          invalid:bg-danger-900" v-model.number="maxCigars"/>
        </label>


        <button class="bg-primary-950 p-4 rounded mt-8" @click="onReset">Reset Data</button>
    </section>

    

  </main>
  
</template>