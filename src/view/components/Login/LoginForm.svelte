<script>
  import {firebase} from "../../../data/store";
  import "./styles.css";

  let providerError = false;

  const login = provider => async () => {
    try {
      switch (provider) {
        case "google": {
          await firebase.signInWithGoogle();
          break;
        }
        case "twitter": {
          await firebase.signInWithTwitter();
          break;
        }
        case "apple": {
          await firebase.signInWithApple();
          break;
        }
        case "facebook":
        default: {
          await firebase.signInWithFacebook();
          break;
        }
      }
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        providerError = true
      }
      //ignore
    }
  };

  const isMac = () => window.navigator.userAgent.indexOf("Mac") !== -1;
</script>

<div class="container loginForm">
  <div class="container socialMediaItem">
    <div class="socialMediaText">
      Sign in with social media
    </div>
  </div>
  {#if providerError}
    <div class="providerErrorText">
      User already registered with different provider
    </div>
  {/if}
  <div class="container iconContainer">
    <div class="container iconItem">
      <button class="iconButton" on:click={login("google")}>
        <img src="assets/googleIcon.png" alt="googleIcon" width={"50px"} />
      </button>
    </div>
    <div class="container iconItem">
      <button class="iconButton" on:click={login("facebook")}>
        <img src="assets/facebookIcon.png" alt="facebookIcon" width={"50px"} />
      </button>
    </div>
    <div class="container iconItem">
      <button class="iconButton" on:click={login("twitter")}>
        <img src="assets/twitterIcon.png" alt="twitterIcon" width={"50px"} />
      </button>
    </div>
    {#if isMac()}
      <div class="container iconItem">
        <button class="iconButton" on:click={login("apple")}>
          <img src="assets/appleIcon.png" alt="appleIcon" width={"50px"} />
        </button>
      </div>
    {/if}
  </div>
</div>
