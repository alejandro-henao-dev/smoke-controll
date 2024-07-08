<script setup lang="ts">
import { CigarsRepo } from '~/components/store/cigars';
import date from 'date-and-time';
import { ConfigRepo } from '~/components/store/config';
  const { $db } = useNuxtApp()


  const timeToAdd = ref<number>(0)
  const maxCigars = ref(0)
  const lastCigarTime = ref<Date>()
  const duedate = ref<Date>()
  const dayCigars = ref(0)
  const timerDone=ref(false)

  const canSmoke = computed(() => {
    if (!duedate.value) return true
    return timerDone.value
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

  const onTimerDone = () => {
    timerDone.value = true
  }
  const onTimerStart = () => {
    timerDone.value = false
  }
  const onNoSmokeClick = async () => {
    
    await cigarsRepo.insert(new Date())
    updateLastCigarTime()
    updateTimeToAdd()
    updateDayCigars()
  }

  const calculateDayDelta = (dates: any[]) => {
    let time = 0
    if(dates.length == 0) return timeToAdd.value
    dates.reduce((accumulator, current, index, array) => {
      const delta = parseFloat(
        date.subtract(accumulator.date, current.date)
          .toMinutes()
          .toFixed(2)
      )

      if (delta === 0 || delta == timeToAdd.value) {
        return current 
      }
      time+=timeToAdd.value - delta  
      return current
    }, { date: new Date() })

    if (time < 0) { 
      time= 0
    }
    return timeToAdd.value + time
  }

</script>
<template>

  

  <div class="flex flex-col items-center justify-center h-dvh">
    <NuxtLink class="absolute right-0 top-0 p-4 text-xl" href="/config">
      <IconConfig/>
    </NuxtLink>

    
    <CountDown class="mb-7" :endDate="duedate" @onDone="onTimerDone" @onStart="onTimerStart"/>

    <ButtonSmoke @click="onSmokeClick" v-if="canSmoke"/>
    <ButtonNoSmoke @click="onNoSmokeClick" v-if="!canSmoke"/>

    <div class="mt-6 font-bold text-xl font-mono bg-slate-950 w-max text-center p-2 ">
      {{ dayCigars }} / {{ maxCigars }}
    </div>
  </div>
  
</template>