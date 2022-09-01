<script>
  import {setUser} from '../../../data/actions'
  import {onUpdate} from '../../../data/state'

  const googleLogin = async () => {
    try {
      await state.firebase.signInWithGoogle()
    }
    catch(error) {
      console.log('>>>>>>>>>', error)
    }
  }
</script>

<div id="auth-component">
  <button id="google-login-btn">Google</button>
</div>
