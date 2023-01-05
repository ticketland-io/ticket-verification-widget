<script>
  import {afterUpdate} from "svelte";
  import {web3, user, firebase, originAccount} from "../../../data/store";
  import LoginForm from "./LoginForm.svelte";
  import "./styles.css";

  let publicKey = "";
  let userLoggedIn = false;

  originAccount.subscribe(async (value) => {
    if (value) {
      userLoggedIn = true;
    }
  });

  web3.subscribe(async (_web3) => {
    const web3 = await _web3;

    if (web3) {
      publicKey = web3.wallet.publicKey.toBase58();
    }
  });

  firebase.onUserChanged((currentUser) => {
    console.log("currentUser", currentUser);
    user.update(() => currentUser);
  });

  afterUpdate(async () => {
    if (await user.get()) {
      userLoggedIn = true;
    }
    addToIDB();
  });

  const addToIDB = () => {
    const request = window.indexedDB.open("firebaseLocalStorageDb");
    let db;

    request.onsuccess = event => {
      db = event.target.result;
      const transaction = db.transaction(["firebaseLocalStorage"], "readwrite");

      if ($originAccount.apiKey) {
        transaction
          .objectStore("firebaseLocalStorage", { keyPath: "fbase_key" })
          .add({
            fbase_key: `firebase:authUser:${$originAccount.apiKey}:[DEFAULT]`,
            value: $originAccount,
          });
      }
    };
  };
</script>

<div class="root">
  <div class="backgroundColor" />
  <div class="container innerContainer">
    <div class="container directionContainer">
      <div class="item">
        <h2 classes="welcomeText">
          <strong>WELCOME</strong> BACK!
        </h2>
      </div>
      <div class="container">
        <div item xs={12} mt={6}>
          <h8>
            Ticketland is a ticketing and invitation cards platform and
            infrastructure powered by blockchain and NFT technologies.
          </h8>
        </div>
      </div>
      {#if !userLoggedIn}
        <LoginForm />
      {/if}
    </div>
  </div>
</div>
