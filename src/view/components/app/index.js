import Auth from '../auth'
import AppComponent from './index.html'

const App = (state) => {
  const render = () => {
    inject('#root', AppComponent);
  }

  const initAuth = () => {
    const auth = Auth(state)
    auth.init()
  }

  const init = () => {
    render()
    initAuth()
  }

  return {init}
}

export default App
