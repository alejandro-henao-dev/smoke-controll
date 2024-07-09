<script setup lang="ts">
import { type Cigar } from '~/components/store/cigars';
import date from 'date-and-time';
  const props = defineProps<
    {
      timeToAdd?: number,
      maxCigars?: number,
      dayCigars?: Cigar[],
      lastCigarTime?:Date
    }>()
  
  const emmit=defineEmits(['onSmoke'])

  const duedate = ref<Date>()
  const timerDone=ref(false)

  const canSmoke = computed(() => {
    if (!duedate.value) return true 
    return timerDone.value
  })

  watchEffect(() => {
    if(!props.timeToAdd || !props.lastCigarTime || !props.dayCigars) return
    duedate.value = date.addMinutes(props.lastCigarTime, calculateDayDelta(props.dayCigars,props.timeToAdd))
  })
  

  const onTimerDone = () => {
    timerDone.value = true
  }
  const onTimerStart = () => {
    timerDone.value = false
  }
  const  onSmokeClick = async() => {
    emmit("onSmoke")
  }
  const onNoSmokeClick = async () => {
    emmit("onSmoke")
  }

  const calculateDayDelta = (dates: Cigar[],baseTimeToAdd:number) => {
    let time = 0
    if(dates.length <= 1) return baseTimeToAdd
    dates.reduce((accumulator, current, index, array) => {
      const delta = parseFloat(
        date.subtract(accumulator.date, current.date)
          .toMinutes()
          .toFixed(2)
      )

      let diff
      if (delta > baseTimeToAdd) {
        // do not apply time in favor
        diff=baseTimeToAdd 
      } else {
        diff= delta
      }
      
      time += baseTimeToAdd - diff
      return current
    })
    
    
    return baseTimeToAdd + time
  }

</script>
<template>
  <GenericCountDown class="mb-7" :endDate="duedate" @onDone="onTimerDone" @onStart="onTimerStart"/>

  <ButtonSmoke @click="onSmokeClick" v-if="canSmoke"/>
  <ButtonNoSmoke @click="onNoSmokeClick" v-if="!canSmoke"/>
</template>