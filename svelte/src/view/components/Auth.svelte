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


  export let publicKey = ''

  state.subscribe(async newState => {
    newState = await newState
    
    if(newState.web3) { 
      publicKey = newState.web3.wallet.publicKey.toBase58()
    }
  })

</script>

<div id="auth-component">
  <p>{publicKey}</p>
  <button id="google-login-btn" on:click={googleLogin}>Google</button>
</div>
