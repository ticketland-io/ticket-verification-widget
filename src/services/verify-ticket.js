import * as borsh from 'borsh'
import * as bs58 from 'bs58'
import {verifyTicket} from './ticket'

// TODO: move all this logic to the online ticket verification app
class VerifyTicketMsg {
  constructor(eventId, codeChallenge, ticketMetadata) {
    this.eventId = eventId
    this.codeChallenge = codeChallenge
    this.ticketMetadata = ticketMetadata
  }
}

const VerifyTicketMsgType = {
  "kind": "struct",
  "fields": [
    ['eventId', 'string'],
    ['codeChallenge', 'string'],
    ['ticketMetadata', 'string'],
  ]
}

export const verify = async (signer, eventId, codeChallenge, ticketMetadata, ticketNft, ticketOwnerPubkey, targetOrigin) => {
  const msg = new VerifyTicketMsg(eventId, codeChallenge, ticketMetadata)
  const schema = new Map([[VerifyTicketMsg, VerifyTicketMsgType]])
  const message = borsh.serialize(schema, msg)
  const {signature} = (await signer.signMessage({message}))

  const response = await verifyTicket(
    ticketMetadata,
    ticketNft,
    eventId,
    codeChallenge,
    ticketOwnerPubkey, 
    bs58.encode(signature)
  )

  const data = {
    ...response,
    target: 'ticketland-widget'
  }

  window.opener.postMessage(data, targetOrigin)
}
