export const addToIDB = account => {
  const request = window.indexedDB.open("firebaseLocalStorageDb");
  let db;

  request.onsuccess = event => {
    db = event.target.result;
    const transaction = db.transaction(["firebaseLocalStorage"], "readwrite");

    if (account.apiKey) {
      transaction
        .objectStore("firebaseLocalStorage", { keyPath: "fbase_key" })
        .add({
          fbase_key: `firebase:authUser:${account.apiKey}:[DEFAULT]`,
          value: account,
        });
    }
  };
};
