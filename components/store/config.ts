import type { Connection } from "jsstore";

export class ConfigRepo{

  constructor(private db: Connection) { }
  
  async getTime() {
    return (await this.db.select<any>({ from: "config", where: { type: "time" } }))[0].value as number
  }

  async updateTime(time:number) {
    await this.db.update({
      in: "config",
      where: { type: "time" },
      set: {
        value:time
      }
    })
  }

  async getMaxCigars() {
    return (await this.db.select<any>({ from: "config", where: { type: "max_cigars" } }))[0].value as number
  }

  async updateMaxCigars(max:number) {
    await this.db.update({
      in: "config",
      where: { type: "max_cigars" },
      set: {
        value:max
      }
    })
  }
}