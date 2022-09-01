import * as anchor from '@project-serum/anchor'
import {setConnection} from '../data/actions'

const {Connection} = anchor.web3

export const initConnection = rpcServer => {
  setConnection(new Connection(rpcServer, 'confirmed'))
}
