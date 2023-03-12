<script>
  import {firebase} from "../../../data/store";
  import "./styles.css";

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
  <div class="container iconContainer">
    <div class="container iconItem">
      <button class="iconButton" on:click={login("google")} >
        <img src="assets/googleIcon.png" alt="googleIcon" />
      </button>
    </div>
    <div class="container iconItem">
      <button class="iconButton" on:click={login("facebook")}>
        <img src="assets/facebookIcon.png" alt="facebookIcon" />
      </button>
    </div>
    <div class="container iconItem">
      <button class="iconButton" on:click={login("twitter")}>
        <img src="assets/twitterIcon.png" alt="twitterIcon" />
      </button>
    </div>
  </div>
</div>
