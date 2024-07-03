import type { Connection } from "jsstore";
import { getIsoDateWithoutTime } from "../utils/DateUtils";

export type Cigar = {
  id:number
  date:Date
}
export class CigarsRepo{
  constructor(private db:Connection) {}
  
  async insert(date: Date): Promise<Cigar> {
    const newCigar:Cigar[]= await this.db.insert<Cigar>({
      into: "cigars",
      values: [
        {
          date
        }
      ],
      return: true
    }) as Cigar[]
    return newCigar[0]
  }

  async getLatest() {
    return (await this.db.select({
      from: "cigars",
      order: {
        by: "date",
        type:"desc"
      }
    }) as Cigar[])[0]
  }
}