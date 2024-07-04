import { Connection, DATA_TYPE, type ITable } from "jsstore";

const ConfigTableSchema:ITable = {
  name: "config",
  columns: {
    id: { primaryKey: true, autoIncrement: true },
    value: { notNull: true},
    type:{notNull:true,dataType:DATA_TYPE.String},
  },
}

const CigarTableSchema:ITable= {
  name: 'cigars',
  columns: {
    id: { primaryKey: true, autoIncrement: true },
    date: { notNull: true, dataType: DATA_TYPE.DateTime },
  },
};

export const StoreSchema = {
  name: "noSmoke-app",
  tables: [CigarTableSchema, ConfigTableSchema],
  version:1
}

export const Seed = async (connection: Connection) => {
  try {
    await connection.insert({
      into: 'config',
      values: [
        {
          id:1,
          type: "time",
          value: 90 
        },
        {
          id:2,
          type: "max_cigars",
          value: 15 
        }
      ],
    });  
  } catch(e) {
    console.log("config seed fail",e)
  }
  
}