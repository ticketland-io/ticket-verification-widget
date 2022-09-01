import inject from '../../../services/view-loader'
import TicketComponent from '../ticket/index.html'
import {onUpdate} from '../../../data/state'

const Ticket = () => {
  const render = () => {
    inject('#ticket', TicketComponent);
  }

  const init = () => {
    onUpdate(['setUser'], async state => {
      if(state.user) {
        render()
      }
    })
  }

  return {init}
}

export default Ticket
