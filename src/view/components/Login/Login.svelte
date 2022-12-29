<script>
  import {afterUpdate} from "svelte";
  import {web3, user, firebase} from "../../../data/store";
  import LoginForm from "./LoginForm.svelte";
  import "./styles.css";

  export let publicKey = "";
  let userLoggedIn = false;

  web3.subscribe(async (_web3) => {
    const web3 = await _web3;

    if (web3) {
      publicKey = web3.wallet.publicKey.toBase58();
    }
  });

  firebase.onUserChanged((currentUser) => {
    user.update(() => currentUser);
  });

  afterUpdate(async () => {
    if (await user.get()) {
      userLoggedIn = true;
    }
  });

  firebase.onUserChanged((currentUser) => {
    user.update(($user) => {
      $user = currentUser;
      return $user;
    });
  });
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
