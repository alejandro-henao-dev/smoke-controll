<script setup lang="ts">
import { CigarsRepo } from '~/components/store/cigars';
import date from 'date-and-time';
import { ConfigRepo } from '~/components/store/config';
  const { $db } = useNuxtApp()


  const timeToAdd = ref<number>(0)
  const maxCigars = ref(0)
  const lastCigarTime = ref<Date>()
  const duedate = ref<Date>()
  const dayCigars= ref(0)

  const canSmoke = computed(() => {
    const delta = getDeltaTime()
    if (delta) {
      return delta?.toMilliseconds() <= 0
    }
    return true
  })

  const cigarsRepo = new CigarsRepo($db)
  const configRepo = new ConfigRepo($db)



  onMounted(() => {
    updateTimeToAdd()
    configRepo.getMaxCigars().then((data: any) => {
      maxCigars.value= data
    })
    updateLastCigarTime()
    updateDayCigars()
    
  })

  watch([lastCigarTime,timeToAdd], () => {  
    if(!timeToAdd.value || !lastCigarTime.value) return
    duedate.value = date.addMinutes(lastCigarTime.value, timeToAdd.value)
  })

  const getDeltaTime = () => {
    if(!duedate.value) return 
    return date.subtract(duedate.value,new Date())
  }

  const updateTimeToAdd = async () => {

    timeToAdd.value =await configRepo.getTime()
    timeToAdd.value = await  cigarsRepo.findByDate(new Date()).then(calculateDayDelta)
  }

  const updateDayCigars = () => {
    cigarsRepo.countCigarsByDate(new Date()).then(count => {
      dayCigars.value=count  
    })
    
  }

  const updateLastCigarTime = () => {
    cigarsRepo.getLatest().then((time) => {
      if (!time) {
      
        return 
      }
      lastCigarTime.value = time?.date as Date
    })
  }

  const  onSmokeClick = async() => {
    await cigarsRepo.insert(new Date())
    updateLastCigarTime()
    updateTimeToAdd()
    updateDayCigars()
  }

  const onNoSmokeClick = async () => {
    
    await cigarsRepo.insert(new Date())
    updateLastCigarTime()
    updateTimeToAdd()
    updateDayCigars()
  }

  const calculateDayDelta = (dates: any[]) => {
    let time = 0
    dates.reduce((accumulator, current, index, array) => {
      const delta = date.subtract( accumulator.date, current.date).toMinutes()
      if ( delta < timeToAdd.value) {
        time+=timeToAdd.value - delta
      }
      return current
    },{date:new Date()})
    return time
  }

</script>
<template>

  

  <div class="flex flex-col items-center justify-center h-dvh">
    <NuxtLink class="absolute right-0 top-0 p-4 text-xl" href="/config">
      <IconConfig/>
    </NuxtLink>

    
    <CountDown class="mb-7" :endDate="duedate" />

    <ButtonSmoke @click="onSmokeClick" v-if="canSmoke"/>
    <ButtonNoSmoke @click="onNoSmokeClick" v-if="!canSmoke"/>

    <div class="mt-6 font-bold text-xl font-mono bg-slate-950 w-24 text-center p-2">
      {{ dayCigars }} / {{ maxCigars }}
    </div>
  </div>
  
</template>