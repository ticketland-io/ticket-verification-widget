import AuthComponent from './index.html'
import ConnectedComponent from './connected.html'
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

    state.firebase.onUserChanged(async currentUser => {
      await setUser(currentUser)
    })
  }

  const init = () => {
    render()
    bindEvents()

    onUpdate(['setUser'], async state => {
      if(state.user) {
        inject('#auth', ConnectedComponent)
      }
    })
  }

  const render = () => {
    inject('#auth', AuthComponent)
  }

  return {init}
}

export default Auth
