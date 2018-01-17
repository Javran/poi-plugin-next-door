import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { modifyObject } from 'subtender'
import { store } from 'views/create-store'

const initState = {
  logs: [],
  /*
     an Array of strings from api_log[?].api_type.
     which means all these strings are strings converted from numbers
   */
  disabledTypes: [],
  ready: false,
}

const reducer = (state = initState, action) => {
  if (action.type === '@@Response/kcsapi/api_port/port') {
    const {body} = action
    const logs = _.get(body,'api_log')
    if (!Array.isArray(logs))
      return state
    return modifyObject('logs',() => logs)(state)
  }

  if (action.type === '@poi-plugin-next-door@Ready') {
    const {newState} = action
    if (newState)
      return {
        ...state,
        ...newState,
        ready: true,
      }
    else
      return {
        ...state,
        ready: true,
      }
  }

  if (!state.ready)
    return state

  if (action.type === '@poi-plugin-next-door@Modify') {
    const {modifier} = action
    return modifier(state)
  }

  return state
}

const actionCreators = {
  ready: newState => ({
    type: '@poi-plugin-next-door@Ready',
    newState,
  }),
  modify: modifier => ({
    type: '@poi-plugin-next-door@Modify',
    modifier,
  }),
  toggleMessageType: typ =>
    actionCreators.modify(
      modifyObject(
        'disabledTypes',
        dts => {
          if (dts.includes(typ)) {
            return dts.filter(x => x !== typ)
          } else {
            return [...dts, typ]
          }
        }
      )
    ),
}

const mapDispatchToProps = _.memoize(dispatch =>
  bindActionCreators(actionCreators, dispatch))

const boundActionCreators =
  mapDispatchToProps(store.dispatch)

export {
  initState,
  reducer,
  actionCreators,
  mapDispatchToProps,
  boundActionCreators,
}
