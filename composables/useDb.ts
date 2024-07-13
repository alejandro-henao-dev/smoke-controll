import JsStore,{Connection} from 'jsstore';
import { Seed, StoreSchema } from '~/store/schema';


const dbExists = async (name:string) => {
  
  return  (await window.indexedDB.databases()).map(db => db.name).includes(name);

}


export const useDb = async () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.baseURL;
  const workerPath = `${baseURL}worker.js`
  const connection = new Connection(new Worker(workerPath));


  await connection.initDb(StoreSchema)
    
  if (!(await dbExists(StoreSchema.name))) {
    await Seed(connection)
  }
  return  connection
}


