import EutopicCore from '@ticketland-io/eutopic-core'
import EutopicSolanaWallet from '@ticketland-io/eutopic-solana-wallet'
import Enclave from '@ticketland-io/eutopic-web-enclave'
import FirebaseAuth from '@ticketland-io/eutopic-firebase-auth'

const Wallet = () => EutopicSolanaWallet({enclave: Enclave()})
const eutopicCore = EutopicCore({Wallet})
const firebase = FirebaseAuth()

eutopicCore.init(
  process.env.VAULT,
  process.env.EUTOPIC_API,
  firebase
)

const state = {
  web3: nill,
  user: null,
  firebase,
  eutopicCore,
}

const subscribers = {
  setUser: [],
}

export const onUpdate = (action, subscriber) => {
  subscribers[action].push(subscriber)
}

const notify = action => subscribers[action].forEach(n => n(state))

export const update = (action) => {
  switch(action.type) {
    case 'setUser':
      state = {...state, user: action.value}
      notify(action.type)
    default:
      return state
  }
}

export const getState = () => {
  return state
}
