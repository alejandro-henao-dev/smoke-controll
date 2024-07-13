import { defineNuxtPlugin } from '#app';
import JsStore,{Connection} from 'jsstore';
import { Seed, StoreSchema } from '~/store/schema';

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.baseURL;
  const workerPath=`${baseURL}worker.js`
  const connection = new Connection(new Worker(workerPath));


  const getDb = ():JsStore.IDataBase => {
    return StoreSchema;
  };


  const exists = await dbExists(getDb().name)

  await connection.initDb(getDb()).then(async() => {
    console.log('Database created successfully');
    if(!exists) await Seed(connection)
  }).catch(err => {
    console.error(err);
  });

  
  return {
    provide: {
      db:connection
    }
  }
});

const dbExists = async (name:string) => {
  const dbs = await window.indexedDB.databases()
  return dbs.map(db => db.name).includes(name);

}