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

  onMounted(() => {
    startCountdown()
  })
  onBeforeUnmount(() => {
    clearInterval(interval.value);
  })

  watch([endDate], () => {
    clearInterval(interval.value);
    startCountdown()
  })

  function startCountdown() {
    if (!endDate?.value) {
      return
    }
    emmiter('onStart')
        // Update the countdown every second
    interval.value = setInterval(function () {
      if (!endDate?.value) return
      
      done.value=false

      const now = new Date().getTime();
      const distance =  endDate.value - now;

      hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds.value = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
          clearInterval(interval.value);
          done.value = true
          emmiter('onDone')
      }
    }, 1000);
  }


</script>

<template>

  <div class="font-extrabold text-2xl font-mono bg-slate-950 text-center p-2">
    <template v-if="done">--:--:--</template>
    <template v-if="!done">{{hours}}:{{minutes}}:{{seconds}}</template>
  </div>

</template>