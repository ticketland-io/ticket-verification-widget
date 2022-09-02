import ticketNftIdl from './idl/ticket_nft.json'
import {
  TICKET_NFT_PROGRAM_ID,
  TICKET_NFT_PROGRAM_ID,
} from './constants'

let ticketNftProgram

export const getTicketNftProgram = async web3 => {
  if(!ticketNftProgram) {
    ticketNftProgram = await web3.createProgram(TICKET_NFT_PROGRAM_ID, ticketNftIdl)
  }

  return ticketNftProgram
}
