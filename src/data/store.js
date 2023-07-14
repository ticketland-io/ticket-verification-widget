import {asyncable} from 'svelte-asyncable'
import {writable} from 'svelte/store'
import {WalletCore, constants} from '@ticketland-io/wallet-core'
import SuiWallet from '@ticketland-io/sui-wallet'
import Enclave from '@ticketland-io/web-enclave'
import FirebaseAuth from '@ticketland-io/firebase-auth'

const Wallet = () => SuiWallet({enclave: Enclave()})
const walletCore = WalletCore({Wallet})
export const firebase = FirebaseAuth()

const web3AuthConfig = {
  clientId: process.env.WEB3_AUTH_CLIENT_ID,
  verifier: process.env.WEB3_AUTH_VERIFIER,
  chainNamespace: constants.CHAIN_NAMESPACES.OTHER,
  domain: process.env.DAPP_DOMAIN,
}

walletCore.init(
  process.env.EUTOPIC_API,
  firebase,
  web3AuthConfig,
)

const urlSearchParams = new URLSearchParams(window.location.search)
export const qs = writable(Object.fromEntries(urlSearchParams.entries()))

export const user = asyncable(() => null)
export const connection = asyncable(() => null)

export const wallet = asyncable(async ($user, $connection) => {
  const user = await $user
  const connection = await $connection

  if(user && connection) {
    const custodyWallet = await walletCore.bootstrap(process.env.CLUSTER_ENDPOINT)

    return custodyWallet
  }
}, undefined, [user, connection])

export const account = asyncable(async($user) => {
  return await walletCore.fetchAccount()
}, undefined, [user])
