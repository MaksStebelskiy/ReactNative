import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';


const DATABASE_NAME = 'myDatabase.db';
const TABLE_NAME = 'costs';

const dbPromise = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbPath = `${FileSystem.documentDirectory}SQLite/${DATABASE_NAME}`;
      await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, {
        intermediates: true,
      });

      const db = SQLite.openDatabase(DATABASE_NAME);

     
      db.transaction(
        (tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (id INTEGER PRIMARY KEY AUTOINCREMENT, year INTEGER, month TEXT, service TEXT, amount REAL);`,
            [],
            (_, result) => {
              resolve(db);
            },
            (_, error) => {
              reject(error);
            }
          );
        },
        (error) => {
          reject(error);
        },
        () => {
          console.log('Transaction is successful');
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

export default dbPromise;
