import AuthComponent from './index.html'
import {setUser} from '../../../data/actions'

const Auth = (state) => {
  const googleLogin = async () => {
    try {
      await state.firebase.signInWithGoogle()
    }
    catch(error) {
      console.log('>>>>>>>>>', error)
    }
  }

  const bindEvents = () => {
    const googleLoginBtn = document.querySelector('#google-login-btn')
    googleLoginBtn.onclick = googleLogin

    state.firebase.onUserChanged(currentUser => {
      setUser(currentUser)
    })
  }

  const init = () => {
    inject('#auth', AuthComponent)
    bindEvents()
  }

  return {init}
}

export default Auth
