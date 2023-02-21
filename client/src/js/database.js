import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Post to the database");

  // Creates connection to the database and version to use
  const jateDb = await openDB("jate", 1);

  // Creates a new transaction and gives users permission to delete instead of just reading
  const tx = jateDb.transaction("jate", "readwrite");

  // Opens object score
  const store = tx.objectStore("jate");

  // Use the put method on the store and passes in the content.
  const request = store.put({
    id: 1,
    value: content,
  });

  // Get confirmation of the request.
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");

  // Create a connection to the database and version we want to
  const jateDb = await openDB("jate", 1);

  // Creates a new transaction and gives users permission to delete instead of just reading
  const tx = jateDb.transaction("jate", "readonly");

  // Opens object store.
  const store = tx.objectStore("jate");

  // Use the .get() method to get all data in the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  console.log("result.value", result);
  return result.value;
};

initdb();
