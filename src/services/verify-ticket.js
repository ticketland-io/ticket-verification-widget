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

export const verify = async (web3, eventId, codeChallenge, ticketMetadata, ticketOwnerPubkey) => {
  const msg = new VerifyTicketMsg(eventId, codeChallenge, ticketMetadata)
  const schema = new Map([[VerifyTicketMsg, VerifyTicketMsgType]]);

  const message = borsh.serialize(schema, msg)
  const sig = await web3.anchorProvider.wallet.signMessage(message)

  console.log('msg >>>>>> ', JSON.stringify(msg))
  console.log('message >>>>>> ', bs58.encode(message))
  console.log('sig >>>>>> ', bs58.encode(sig))

  return await verifyTicket(
    ticketMetadata,
    eventId,
    codeChallenge,
    ticketOwnerPubkey, 
    bs58.encode(sig)
  )
}
