<script>
  import {afterUpdate} from "svelte";
  import {web3, user, firebase} from "../../../data/store";
  import {addToIDB} from "../../../services/helpers";
  import LoginForm from "./LoginForm.svelte";
  import "./styles.css";

  let publicKey = "";
  let userLoggedIn = false;
  let loading = true;

  window.addEventListener("message", event => {
    if (Boolean(event.data.user) && event.data.target === 'ticketland-auth') {
      addToIDB(event.data.user)
      userLoggedIn = true
      loading = false
    }
  });

  web3.subscribe(async (_web3) => {
    const web3 = await _web3;

    if (web3) {
      publicKey = web3.wallet.publicKey.toBase58();
    }
  });

  firebase.onUserChanged((currentUser) => {
    loading = false
    user.update(() => currentUser);
  });

  afterUpdate(async () => {
    if (await $user) {
      userLoggedIn = true;
    }
  });
</script>

{#if !loading && !userLoggedIn}
  <div class="root">
    <div class="container innerContainer">
      <div class="container directionContainer">
        <LoginForm />
      </div>
    </div>
  </div>
{/if}
