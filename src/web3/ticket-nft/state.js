import {getTicketNftProgram as getProgram} from '../program'

export const fetchTicketMetadata = async (web3, ticketMetadata) => {
  const program = await getProgram(web3)
  return await program.account.ticketMetadata.fetch(ticketMetadata)
}
