import {Connection, JsonRpcProvider} from '@mysten/sui.js'

export const initConnection = rpcServer => {
  return new JsonRpcProvider(
    new Connection({fullnode: rpcServer})
  )
}
