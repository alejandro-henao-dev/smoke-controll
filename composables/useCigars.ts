import { CigarsRepo, type Cigar } from "~/components/store/cigars"

export const useCigarsStore = () => {
  const { $db } = useNuxtApp()
  const cigarsRepo = new CigarsRepo($db)

  return cigarsRepo
}

export const useDayCigars = (date:Date) => {
  const dayCigars = ref<Cigar[]>()
  const repo = useCigarsStore()
  
  const update = () => {
    repo.findByDate(date).then(cigars => dayCigars.value = cigars as Cigar[])
  }
  
  update()

  return {
    dayCigars,
    update
  }
}

export const useLastCigar = () => {
  const lastCigar = ref<Cigar>()  
  const repo = useCigarsStore()
  
  const update = () => {
    repo.getLatest().then((time) =>lastCigar.value = time)
  }

  update()

  return {
    lastCigar,
    update
  }

}