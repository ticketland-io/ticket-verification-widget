import TicketComponent from '../ticket/index.html'
import {onUpdate} from '../../../data/actions'

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
