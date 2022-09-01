import * as anchor from '@project-serum/anchor'

const {Connection} = anchor.web3

export const initConnection = rpcServer => {
  return new Connection(rpcServer, 'confirmed')
}
