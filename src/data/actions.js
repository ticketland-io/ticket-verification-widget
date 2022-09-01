import {update} from './state'

export const setUser = (currentUser) => {
  update({type: 'setUser', value: currentUser})
}
