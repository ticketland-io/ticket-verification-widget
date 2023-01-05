import {asyncable} from 'svelte-asyncable'
import {writable} from 'svelte/store'
import Web3 from '@apocentre/solana-web3'
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

const urlSearchParams = new URLSearchParams(window.location.search)
export const qs = writable(Object.fromEntries(urlSearchParams.entries()))

export const user = asyncable(() => null)
export const connection = asyncable(() => null)

export const web3 = asyncable(async($user, $connection) => {
  const user = await $user
  const connection = await $connection

  if(user && connection) {
    const web3 = Web3()
    const custodyWallet = await eutopicCore.bootstrap(user)
    await web3.init(connection, custodyWallet)

    return web3
  }
}, undefined, [user, connection])

export const account = asyncable(async($user) => {
  return await eutopicCore.fetchAccount()
}, undefined, [user])

export const originAccount = writable('')
