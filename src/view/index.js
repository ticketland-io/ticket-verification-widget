import {getState} from '../data/state'
import App from './components/app'

window.onload = () => {
  const app = App(getState())
  app.init()
}
