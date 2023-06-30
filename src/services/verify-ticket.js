import * as borsh from 'borsh'
import * as bs58 from 'bs58'
import keccak256 from 'keccak256'
import {verifyTicket} from './ticket'

// TODO: move all this logic to the online ticket verification app
class VerifyTicketMsg {
  constructor(eventId, codeChallenge, cntSuiAddress) {
    this.eventId = eventId
    this.codeChallenge = codeChallenge
    this.cntSuiAddress = cntSuiAddress
  }
}

const VerifyTicketMsgType = {
  "kind": "struct",
  "fields": [
    ['eventId', 'string'],
    ['codeChallenge', 'string'],
    ['cntSuiAddress', 'string'],
  ]
}

export const verify = async (wallet, eventId, codeChallenge, cntSuiAddress, ticketOwnerPubkey, targetOrigin) => {
  const msg = new VerifyTicketMsg(eventId, codeChallenge, cntSuiAddress)
  const schema = new Map([[VerifyTicketMsg, VerifyTicketMsgType]])
  const message = borsh.serialize(schema, msg)
  const signature = (await wallet.signMessage(message))

  const response = await verifyTicket(
    cntSuiAddress,
    eventId,
    codeChallenge,
    ticketOwnerPubkey,
      Buffer.from(signature).toString('hex')

  )

  const data = {
    ...response,
    target: 'ticketland-widget'
  }

  window.opener.postMessage(data, targetOrigin)
}
