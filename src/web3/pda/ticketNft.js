import * as anchor from '@project-serum/anchor'

const {PublicKey} = anchor.web3
const utf8 = anchor.utils.bytes.utf8

export const ticketNft = async (state, seatIndex, eventId, programId) => await PublicKey.findProgramAddress(
  [utf8.encode('ticket_nft'), state.toBuffer(), utf8.encode(seatIndex), utf8.encode(eventId)],
  programId
)

export const ticketMetadata = async (state, ticketNft, programId) => await PublicKey.findProgramAddress(
  [utf8.encode('ticket_metadata'), state.toBuffer(), ticketNft.toBuffer()],
  programId
)
