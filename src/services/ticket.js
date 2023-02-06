import fetch, {createBearerHeader} from './api'
import {firebase} from '../data/store'

export const fetchTickets = async (eventId) => {
  return await fetch(
    `${process.env.TICKETLAND_API}/tickets?event_id=${eventId}`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken()),
    }
  )
}

export const verifyTicket = async (ticketMetadata, ticketNft, eventId, codeChallenge, ticketOwnerPubkey, sig) => {
  return await fetch(
    `${process.env.TICKETLAND_API}/tickets/${ticketNft}/verifications`,
    'POST',
    {
      body: {
        event_id: eventId,
        code_challenge: codeChallenge,
        ticket_owner_pubkey: ticketOwnerPubkey,
        ticket_metadata: ticketMetadata,
        ticket_nft: ticketNft,
        sig,
      }
    }
  )
}

export const normalizeEventId = eventId => eventId.replaceAll('-', '')
