<script>
  import {firebase} from '../../../data/store';
  import './styles.css';

  const login = async (provider) => {
    try {
      if(provider === 'google'){
        await firebase.signInWithGoogle();
      }else if(provider === 'facebook'){
        await firebase.signInWithFacebook();
      }else{
        await firebase.signInWithTwitter();
      }
    } catch (error) {
      console.log('>>>>>>>>>', error);
    }
  };

</script>

<div class='container loginForm'>
  <div class='container socialMediaItem'>
    <div class='socialMediaText'>
      Sign in with social media
    </div>
  </div>
  <div class='container iconContainer'>
    <div class='container iconItem'>
      <button class='iconButton' on:click={async()=>{await login('google')}}>
        <img src='assets/googleIcon.png' alt='googleIcon'/>
      </button>
    </div>
    <div class='container iconItem'>
      <button class='iconButton' on:click={async()=>{await login('facebook')}}>
        <img src='assets/facebookIcon.png' alt='facebookIcon'/>
      </button>
    </div>
    <div class='container iconItem'>
      <button class='iconButton' on:click={async()=>{await login('twitter')}}>
        <img src='assets/twitterIcon.png' alt='twitterIcon'/>
      </button>
    </div>
  </div>
</div>
