<script>
  import {state, firebase} from '../../data/store'
  

  const googleLogin = async () => {
    try {
      await firebase.signInWithGoogle()
    }
    catch(error) {
      console.log('>>>>>>>>>', error)
    }
  }

  firebase.onUserChanged(currentUser => {
    state.update($state => {
      $state.user = currentUser
      return $state
    })
  })
</script>

<div id="auth-component">
  <button id="google-login-btn" on:click={googleLogin}>Google</button>
</div>
