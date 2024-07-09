import { ConfigRepo } from "~/components/store/config"

export const useConfig = () => {
  const { $db } = useNuxtApp()

  const timeToAdd = ref<number>(0)
  const maxCigars = ref(0)

  const configRepo = new ConfigRepo($db)

  const loadTimeToAdd = async () => timeToAdd.value = await configRepo.getTime()
  const loadMaxCigars = async () => configRepo.getMaxCigars().then((data: any) => maxCigars.value = data)
  
  watch(timeToAdd, () => {
    if(isNaN(parseInt(timeToAdd.value as any))) return 
    configRepo.updateTime(timeToAdd.value)
  })

  watch(maxCigars, () => {
    if(isNaN(parseInt(maxCigars.value as any))) return 
    configRepo.updateMaxCigars(maxCigars.value)
  })


  loadTimeToAdd()
  loadMaxCigars()

  return {
    timeToAdd: timeToAdd,
    maxCigars: maxCigars,
    
    reload: () => {
      loadTimeToAdd()
      loadMaxCigars()
    }
  }

}