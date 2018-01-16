import _ from 'lodash'
import { modifyObject } from 'subtender'

const initState = {
  logs: [],
}

const reducer = (state = initState, action) => {
  if (action.type === '@@Response/kcsapi/api_port/port') {
    const {body} = action
    const logs = _.get(body,'api_log')
    if (!Array.isArray(logs))
      return state
    return modifyObject('logs',() => logs)(state)
  }

  return state
}

export {
  initState,
  reducer,
}
