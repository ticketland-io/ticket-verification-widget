import * as anchor from '@project-serum/anchor'

const {PublicKey} = anchor.web3

export const TICKET_NFT_PROGRAM_ID = new PublicKey(process.env.TICKET_NFT_PROGRAM_ID)
export const TICKET_NFT_STATE = new PublicKey(process.env.TICKET_NFT_STATE)
