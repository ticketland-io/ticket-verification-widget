import fetch, {createBearerHeader} from './api'
import {firebase} from '../data/store'

export const fetchTickets = async (eventId) => {
  return await fetch(
    `${process.env.TICKETLAND_API}/cnts?event_id=${eventId}`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken()),
    }
  )
}

export const verifyTicket = async (
  cntSuiAddress,
  eventId,
  codeChallenge,
  ticketOwnerPubkey,
  sig
) => {
  return await fetch(
    `${process.env.TICKETLAND_API}/cnts/${cntSuiAddress}/verifications`,
    'POST',
    {
      body: {
        event_id: eventId,
        code_challenge: codeChallenge,
        ticket_owner_pubkey: ticketOwnerPubkey,
        sig,
      }
    }
  )
}

export const normalizeEventId = eventId => eventId.replaceAll('-', '')
