import { defineNuxtPlugin } from '#app';
import JsStore,{Connection, DATA_TYPE} from 'jsstore';
// import workerInjector from 'jsstore/dist/jsstore.worker.commonjs2';

export default defineNuxtPlugin((nuxtApp) => {
  
  const connection = new Connection(new Worker("/worker.js"));
  

  const dbName = 'MyDatabase';

  const getDb = ():JsStore.IDataBase => {
    const tblCigars = {
      name: 'cigars',
      columns: {
        id: { primaryKey: true, autoIncrement: true },
        date: { notNull: true, dataType: DATA_TYPE.DateTime },
      },
    };

    const tblConfig:JsStore.ITable = {
      name: "config",
      columns: {
        id: { primaryKey: true, autoIncrement: true },
        value: { notNull: true},
        type:{notNull:true,dataType:DATA_TYPE.String},
      }
    }

    const dataBase:JsStore.IDataBase = {
      name: dbName,
      tables: [tblCigars, tblConfig],
      version:1
    };

    return dataBase;
  };



  connection.initDb(getDb()).then(async() => {
    console.log('Database created successfully');
    const data = await connection.select({ from: "config" })
    if(data.length > 0 ) return 
    await connection.insert({
      into: 'config',
      values: [
      {
        type: "time",
        value: 90 
      }],
    });
  }).catch(err => {
    console.error(err);
  });

  
  return {
    provide: {
      db:connection
    }
  }
  nuxtApp.provide('db', connection);
});
