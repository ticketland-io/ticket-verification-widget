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
  web3: null,
  connection: null,
  user: null,
  firebase,
  eutopicCore,
}

const subscribers = {
  setUser: [],
}

export const onUpdate = (actions, subscriber) => {
  actions.forEach(action => subscribers[action].push(subscriber))
}

const notify = action => {
  for (let i = 0; i < subscribers[action].length; i++) {
    const subscriber = subscribers[action][i]
    await subscriber(state)
  }
}

export const update = async (action) => {
  switch(action.type) {
    case 'setUser':
      state = {...state, user: action.value}
      break
    case 'setConnection':
      state = {...state, connection: action.value}
      break
    case 'setWeb3':
      state = {...state, web3: action.value}
      break
    default:
      return state
  }

  notify(action.type)
}

export const getState = () => {
  return state
}