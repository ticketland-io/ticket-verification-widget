import {asyncable} from 'svelte-asyncable'
import {writable} from 'svelte/store'
import Web3 from '@apocentre/solana-web3'
import {WalletCore, constants} from '@ticketland-io/wallet-core'
import SolanaWallet from '@ticketland-io/solana-wallet'
import Enclave from '@ticketland-io/web-enclave'
import FirebaseAuth from '@ticketland-io/firebase-auth'

const Wallet = () => SolanaWallet({enclave: Enclave()})
const walletCore = WalletCore({Wallet})
const firebase = FirebaseAuth()

const web3AuthConfig = {
  clientId: process.env.WEB3_AUTH_CLIENT_ID,
  verifier: process.env.WEB3_AUTH_VERIFIER,
  chainId: process.env.CHAIN_ID,
  chainNamespace: constants.CHAIN_NAMESPACES.SOLANA,
  rpcTarget: process.env.CLUSTER_ENDPOINT,
  web3AuthNetwork: process.env.WEB_AUTH_NETWORK,
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

export const web3 = asyncable(async($user, $connection) => {
  const user = await $user
  const connection = await $connection

  if(user && connection) {
    const web3 = Web3()
    const custodyWallet = await state.walletCore.bootstrap()
    await web3.init(connection, custodyWallet)

    return web3
  }
}, undefined, [user, connection])

export const account = asyncable(async($user) => {
  return await eutopicCore.fetchAccount()
}, undefined, [user])
