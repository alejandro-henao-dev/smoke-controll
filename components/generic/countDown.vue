<script setup lang="ts">
// import date from 'date-and-time';
  const props=defineProps<{
    endDate?:Date
  }>()
  const emmiter=defineEmits(["onDone",'onStart'])
  const done=ref(true)
  const hours = ref(0)
  const minutes = ref(0)
  const seconds = ref(0)
  const interval = ref<any>(null)
  const endDate = computed(() => {
    return props.endDate?.getTime()
  })

  // onMounted(() => {

  startCountdown()
  // })
  onUpdated(() => {
    calculateTimer()
  })
  onBeforeUnmount(() => {
    clearInterval(interval.value);
  })

  watch([endDate], () => {
    clearInterval(interval.value);
    startCountdown()
  })

  function calculateTimer (){
    if (!endDate?.value) {
      return
    }
    
    const now = new Date().getTime();
    const distance =  endDate.value - now;

    hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds.value = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance <= 0) {
        clearInterval(interval.value);
        done.value = true
        emmiter('onDone')
    }
  }

  function startCountdown() {
    if (!endDate?.value) {
      return
    }
    emmiter('onStart')
    done.value = false
    calculateTimer()
    interval.value = setInterval(calculateTimer, 1000);
  }

  const formatNumbers = (num:number | string) => {
    return num.toString().padStart(2,"0")
  }
</script>

<template>

  <div class="font-extrabold text-2xl font-mono bg-slate-950 text-center p-2"
  >
    <span v-if="done"aria-label="timer off" >--:--:--</span>
    <span v-if="!done" aria-label="timer on">{{formatNumbers(hours)}}:{{formatNumbers(minutes)}}:{{formatNumbers(seconds)}}</span>
  </div>

</template>