import { defineNuxtPlugin } from '#app';
import JsStore,{Connection} from 'jsstore';
import { Seed, StoreSchema } from '~/components/store/schema';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.baseURL;
  const workerPath=`${baseURL}worker.js`
  const connection = new Connection(new Worker(workerPath));


  const getDb = ():JsStore.IDataBase => {
    return StoreSchema;
  };



  connection.initDb(getDb()).then(async() => {
    console.log('Database created successfully');
    Seed(connection)
  }).catch(err => {
    console.error(err);
  });

  
  return {
    provide: {
      db:connection
    }
  }
});
