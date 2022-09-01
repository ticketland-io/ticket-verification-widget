import {asyncable} from 'svelte-asyncable'
import EutopicCore from '@ticketland-io/eutopic-core'
import EutopicSolanaWallet from '@ticketland-io/eutopic-solana-wallet'
import Enclave from '@ticketland-io/eutopic-web-enclave'
import FirebaseAuth from '@ticketland-io/eutopic-firebase-auth'

const Wallet = () => EutopicSolanaWallet({enclave: Enclave()})
export const eutopicCore = EutopicCore({Wallet})
export const firebase = FirebaseAuth()

eutopicCore.init(
  process.env.VAULT,
  process.env.EUTOPIC_API,
  firebase
)

export const state = asyncable(async () => {
  return {
    web3: null,
    connection: null,
    user: null,
  }
})

state.subscribe(async newState => {
  if(newState.user && newState.connection && !newState.web3) {
    const web3 = Web3()
    const custodyWallet = await eutopicCore.bootstrap(newState.user)
    await web3.init(newState.connection, custodyWallet)

    state.set({
      ...state,
      web3,
    })
  }
})
