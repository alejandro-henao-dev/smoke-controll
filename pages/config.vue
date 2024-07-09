<script setup lang="ts">

  const {version}=useRuntimeConfig().public
  const { timeToAdd, maxCigars } = useConfig()
  const {$db} = useNuxtApp()
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
    <section class="border border-primary-700  p-8 container m-auto flex
    flex-col gap-4 w-full" >
    

        <label class="grid grid-cols-[1fr_4rem] gap-4">
          <span class="">Minutes in between</span>
          <input name="perday" type="number"
          class=" w-16 bg-primary-950 text-center
          invalid:bg-danger-900" v-model.number="timeToAdd"/>
        </label>

        <label class="grid grid-cols-[1fr_4rem] gap-4">
          <span class="">Max per day:</span>
          <input name="perday" type="number"
          class=" w-16 bg-primary-950 text-center
          invalid:bg-danger-900" v-model.number="maxCigars"/>
        </label>


        <button class="bg-primary-950 p-4 rounded mt-8" @click="onReset">Reset Data</button>
    </section>

    

    <section id="app-info" class="w-max p-8 container m-auto flex flex-col gap-1
    text-center">
      <p class="text-xs text-primary-600 m-0">Version: {{ version }}</p>
      <p class="text-xs text-primary-600 m-0 underline">
        <a href="https://www.linkedin.com/in/alejandro-henao-fullstackdev/"
        target="_blank">
          By: Alejandro Henao
        </a>
      </p>
    </section>
  </main>
  
</template>