<script>
  import {web3, user, firebase} from '../../data/store'
  
  web3.subscribe(async _web3 => {
    const web3 = await _web3

    if(web3) {
      publicKey = web3.wallet.publicKey.toBase58()
    }
  })

  const googleLogin = async () => {
    try {
      await firebase.signInWithGoogle()
    }
    catch(error) {
      console.log('>>>>>>>>>', error)
    }
  }

  firebase.onUserChanged(currentUser => {
    user.update($user => {
      $user = currentUser
      return $user
    })
  })


  export let publicKey = ''
</script>

<div id="auth-component">
  <p>{publicKey}</p>
  <button id="google-login-btn" on:click={googleLogin}>Google</button>
</div>
