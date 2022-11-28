<script>
  import { web3, user, firebase } from "../../../data/store";
  import { useState, useEffect } from "../../../data/hooks";
  import "./style.css";


  const login = async (provider) => {
    try {
      if(provider==='google'){
        await firebase.signInWithGoogle();
      }else{
        await firebase.signInWithFacebook();
      }
    } catch (error) {
      console.log(">>>>>>>>>", error);
    }
  };

</script>

<div class="container loginForm">
  <div class='container socialMediaItem'>
    <div class='socialMediaText'>
      Sign in with social media
    </div>
  </div>
  <div class='container iconContainer'>
    <div class='container firstIconItem'>
      <button class='button' on:click={async()=>{await login('google')}}>
        <img src="assets/googleIcon.png" />
      </button>
    </div>
    <div class='container secondIconItem'>
      <button class='button' on:click={async()=>{await login('facebook')}}>
        <img src='assets/facebookIcon.png' />
      </button>
    </div>
  </div>
</div>
