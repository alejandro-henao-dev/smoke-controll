<script setup lang="ts">
import { type Cigar } from '~/store/cigars';
import date from 'date-and-time';
  const props = defineProps<
    {
      timeToAdd?: number,
      maxCigars?: number,
      dayCigars?: Cigar[],
    }>()
  
  const emmit = defineEmits(['onSmoke'])

  const lastCigarTime = computed(() => {
    return props.dayCigars?.at(0)?.date
  })

  const duedate = computed(() => {
    if (!props.timeToAdd || !lastCigarTime.value || !props.dayCigars) return
    return date.addMinutes(lastCigarTime.value, calculateDayDelta(props.dayCigars, props.timeToAdd))
  })

  const timerDone=ref(false)

  const canSmoke = computed(() => {
    if (!duedate.value) return true 
    return timerDone.value
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

  function calculateDayDelta (dates: Cigar[],baseTimeToAdd:number) {
    let time = 0
    if(dates.length <= 1) return baseTimeToAdd
    dates.reduce((accumulator, current, index, array) => {
      const delta = parseFloat(
        date.subtract(accumulator.date, current.date)
          .toMinutes()
          .toFixed(2)
      )
      
      let diff=0
      if (delta >= baseTimeToAdd) {
        diff-=delta - baseTimeToAdd
      } else {
        diff+= delta
      }

      time += diff
      return current
    })
    // do not apply time in favor
    if(time < 0) return baseTimeToAdd
    return baseTimeToAdd + time
  }

</script>
<template>
  <GenericCountDown class="mb-7" :endDate="duedate" @onDone="onTimerDone" @onStart="onTimerStart"/>

  <ButtonSmoke @click="onSmokeClick" v-if="canSmoke"/>
  <ButtonNoSmoke @click="onNoSmokeClick" v-if="!canSmoke"/>
</template>