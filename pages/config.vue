<script setup lang="ts">
  const time=ref(0)
  const {$db} = useNuxtApp()

  
  $db.select({ from: "config", where: { type: "time" } }).then((data: any) => {
   time.value= data[0].value as number
  })


  watch(time, () => {
    if(isNaN(parseInt(time.value as any))) return 
    $db.update({
      in: "config",
      where: { type: "time" },
      set: {
        value:time.value
      }
    })
  })
</script>

<template>
  
  <div class=" border-b border-primary-600 flex items-center gap-8">
    <NuxtLink class="p-4" href="/">
      <IconArrowLeft/>
    </NuxtLink>

    <p>Settings</p>
  </div>


  <main class="mt-8">
    <section class="border border-primary-700 w-max p-8 container m-auto flex flex-col gap-4" >
    

        <label class="grid grid-cols-[1fr_4rem] gap-4">
          <span class="">Minutes in between</span>
          <input name="perday" type="number"
          class="bg-transparent w-16 bg-primary-950 text-center
          invalid:bg-danger-900" v-model.number="time"/>
        </label>
    </section>

  </main>
  
</template>