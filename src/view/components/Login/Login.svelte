<script>
  import {web3, user, firebase} from "../../../data/store";
  import {useState, useEffect} from "../../../data/hooks";
  import LoginForm from "./LoginForm.svelte";
  import "./style.css";

  const [logedIn, setLogedIn] = useState(false);

  web3.subscribe(async (_web3) => {
    const web3 = await _web3;

    if (web3) {
      publicKey = web3.wallet.publicKey.toBase58();
    }
  });

  firebase.onUserChanged((currentUser) => {
    user.update(($user) => {
      $user = currentUser;
      return $user;
    });
  });

  const run = async () => {
    let userObj = await user.get();

    if (userObj) {
      setLogedIn(true);
    }
  };

  useEffect(() => {
    run();
  });

  firebase.onUserChanged((currentUser) => {
    user.update(($user) => {
      $user = currentUser;
      return $user;
    });
  });

  export let publicKey = "";
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
      {#if !$logedIn}
        <LoginForm />
      {/if}
    </div>
  </div>
</div>
