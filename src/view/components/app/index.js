import inject from '../../../services/view-loader'
import {initConnection} from '../../../services/connection'
import Auth from '../auth'
import AppComponent from './index.html'
import Ticket from '../ticket/index'

const App = (state) => {
  const initAuth = () => {
    const auth = Auth(state)
    auth.init()
  }

  const initTicket = () => {
    const ticket = Ticket()
    ticket.init()
  }

  const init = () => {
    render()
    initAuth()
    initTicket()
    initConnection(process.env.CLUSTER_ENDPOINT)
  }

  const render = () => {
    inject('#root', AppComponent);
  }
  
  return {init}
}

export default App
