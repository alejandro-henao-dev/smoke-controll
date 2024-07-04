import { defineNuxtPlugin } from '#app';
import JsStore,{Connection} from 'jsstore';
import { Seed, StoreSchema } from '~/components/store/schema';

export default defineNuxtPlugin((nuxtApp) => {
  
  const connection = new Connection(new Worker("/worker.js"));


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
