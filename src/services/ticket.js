import fetch, {createBearerHeader} from './api'
import {firebase} from '../data/store'

export const fetchTickets = async (eventId) => {
  return await fetch(
    `${process.env.TICKETLAND_API}/tickets?event_id=${eventId}`,
    'GET',
    {
      headers: createBearerHeader(firebase.accessToken()),
    }
  )
}
