

export const minutesToClockTime=(minutes:number)=> {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.floor(minutes % 60);
  const seconds = Math.floor((minutes % 1) * 60);

  return {
      hours: padNumbers(hours),
      minutes: padNumbers(remainingMinutes),
      seconds: padNumbers(seconds)
  };
}

const padNumbers = (num:number | string) => {
return num.toString().padStart(2,"0")
}

export const relativeTimeByMs = (baseDate:Date,ms:number) => {
  return new Date(baseDate.getTime() + ms);
}

export const relativeTimeByMin = (baseDate:Date,minutes:number) => {
  return relativeTimeByMs(baseDate,minutes*60*1000)
}