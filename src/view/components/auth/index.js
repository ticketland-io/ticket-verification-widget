import inject from '../../../services/view-loader'
import AuthComponent from './index.html'
import ConnectedComponent from './connected.html'
import {setUser} from '../../../data/actions'
import {onUpdate} from '../../../data/state'

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

    onUpdate(['setWeb3'], async state => {
      if(state.user) {
        inject('#auth', ConnectedComponent)
        inject('#auth-account', state.web3.wallet.publicKey.toBase58())
      }
    })
  }

  const render = () => {
    inject('#auth', AuthComponent)
  }

  return {init}
}

export default Auth
