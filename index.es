import { reducer, boundActionCreators as bac } from './store'
import {
  globalSubscribe,
  globalUnsubscribe as pluginWillUnload,
} from './observers'
import { loadPState } from './p-state'

const pluginDidLoad = () => {
  globalSubscribe()
  setTimeout(() => {
    const pState = loadPState()
    if (pState !== null) {
      const {disabledTypes} = pState
      bac.ready({disabledTypes})
    } else {
      bac.ready(undefined)
    }
  })
}

export {
  reducer,
  pluginDidLoad,
  pluginWillUnload,
}
