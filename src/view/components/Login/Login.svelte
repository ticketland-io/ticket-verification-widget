<script>
  import {afterUpdate} from "svelte";
  import {wallet, user, firebase} from "../../../data/store";
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

  wallet.subscribe(async (_wallet) => {
    const wallet = await _wallet;

    if (wallet) {
      publicKey = wallet.publicKey.toSuiAddress();
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
