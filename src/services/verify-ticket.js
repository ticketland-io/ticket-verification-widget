import * as borsh from 'borsh'
import * as bs58 from 'bs58'
import nacl from 'tweetnacl'
import keccak256 from 'keccak256'

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

export const verify = async (web3, eventId, codeChallenge, ticketMetadata) => {
  const msg = new VerifyTicketMsg(eventId, codeChallenge, ticketMetadata)
  const schema = new Map([[VerifyTicketMsg, VerifyTicketMsgType]]);

  const message = borsh.serialize(schema, msg)
  const sig = await web3.anchorProvider.wallet.signMessage(message)

  console.log('msg >>>>>> ', JSON.stringify(msg))
  console.log('message >>>>>> ', bs58.encode(message))
  console.log('sig >>>>>> ', bs58.encode(sig))

  const response = await verifyTicket()
}

class SeverVerificationMsg {
  constructor(eventId, codeChallenge, ticketMetadata, ticketOwnerPubkey) {
    this.eventId = eventId
    this.codeChallenge = codeChallenge
    this.codeChallenge = codeChallenge
    this.ticketMetadata = ticketMetadata
    this.ticketOwnerPubkey = ticketOwnerPubkey
  }
}

const ServerVerificationMsgType = {
  "kind": "struct",
  "fields": [
    ['eventId', 'string'],
    ['codeChallenge', 'string'],
    ['ticketOwnerPubkey', 'string'],
    ['ticketMetadata', 'string'],
  ]
}

export const validateServerVerificationResponse = async (codeChallenge, response, ticketLandApiPubKey) => {
  // the original code challenge must match the one Ticketland API has included in the signed message
  if(codeChallenge !== response.code_challenge) {
    throw new Error('Verification failed')
  }

  const {event_id, ticket_metadata, ticket_owner_pubkey, server_sig} = response
  const msg = new SeverVerificationMsg(event_id, response.code_challenge, ticket_metadata, ticket_owner_pubkey)
  const schema = new Map([[SeverVerificationMsg, ServerVerificationMsgType]]);
  const message = borsh.serialize(schema, msg)

  // if true then the Ticketland API has committed into the following
  // "ticketOwnerPubkey is the owner of the ticket metadata for the given event id and I confirm this a response to the request identified by the code challenge" 
  const result = nacl.sign.detached.verify(keccak256(message), bs58.decode(server_sig), ticketLandApiPubKey.toBuffer())
  console.log('>>>>>>>>>', result)
}
