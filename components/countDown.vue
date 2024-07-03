<script setup lang="ts">
// import date from 'date-and-time';
  const props=defineProps<{
    endDate:Date
  }>()

  const done=ref(true)
  const hours = ref(0)
  const minutes = ref(0)
  const seconds = ref(0)
  const interval=ref<any>(null)

  function startCountdown(targetDate: Date) {
    
        // Parse the target date
        const endDate = new Date(targetDate.toString()).getTime();

        // Update the countdown every second
        interval.value = setInterval(function() {
            done.value=false
            // Get the current date and time
            const now = new Date().getTime();

            // Find the distance between now and the target date
            const distance =  ( endDate -now);

            // Calculate hours, minutes, and seconds
            hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            seconds.value = Math.floor((distance % (1000 * 60)) / 1000);

            // If the countdown is over, display "EXPIRED"
            if (distance < 0) {
                clearInterval(interval.value);
                done.value=true
            }
        }, 1000);
  }

  onMounted(() => {
    startCountdown(props.endDate)
  })
  onBeforeUnmount(() => {
    clearInterval(interval.value);
  })

</script>

<template>

  <div class="font-extrabold text-2xl font-mono bg-slate-950 text-center p-2">
    <template v-if="done">--:--:--</template>
    <template v-if="!done">{{hours}}:{{minutes}}:{{seconds}}</template>
  </div>

</template>