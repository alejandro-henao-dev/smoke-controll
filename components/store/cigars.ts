import { DATA_TYPE, type Connection, type ITable } from "jsstore";
import DateTime from "date-and-time"

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

  async getLatest<T>(latest?:T):Promise<T extends number ? Cigar[] : Cigar > {
    const cigars= (await this.db.select({
      from: "cigars",
      order: {
        by: "date",
        type:"desc"
      }
    }) as Cigar[])
    if(!latest) return cigars[0] as T extends number ? Cigar[] : Cigar 
    return cigars.slice(0,latest as number) as T extends number ? Cigar[] : Cigar 
  }

  async findByDate(date:Date) {
    const formatedDate=DateTime.format(date,"ddd MMM DD YYYY")
   
    return await this.db.select({
      from: "cigars",
      order: {
        by: "date",
        type:"desc"
      },
      where: {
        date: {
          like:`%${formatedDate}%`
        } 
      }
    })
  }

  async countCigarsByDate(date: Date) {
    const formatedDate=DateTime.format(date,"ddd MMM DD YYYY")
    const data=(await this.db.select<any>({
      from: "cigars",
      aggregate: {
        count:"id"
      },
      where: {
        date: {
          like:`%${formatedDate}%`
        } 
      }
    }))[0]

    if (!data) {
      return 0
    }
    return data['count(id)']
  }
}
