import {update, onUpdate} from './state'
import Web3 from '@apocentre/solana-web3'

export const setUser = async (currentUser) => await update({type: 'setUser', value: currentUser})
export const setConnection = async connection => await update({type: 'setConnection', value: connection})
export const setWeb3 = async web3 => await update({type: 'setWeb3', value: web3})

// Init web3 when user is registered
onUpdate(['setUser', 'setConnection'], async state => {
  if(state.user && state.connection && !state.web3) {
    const web3 = Web3()
    const custodyWallet = await state.eutopicCore.bootstrap(state.user)
    await web3.init(state.connection, custodyWallet)

    setWeb3(web3)
  }
})
