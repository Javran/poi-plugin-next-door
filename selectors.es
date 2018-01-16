import _ from 'lodash'
import { createSelector } from 'reselect'
import {
  extensionSelectorFactory,
} from 'views/utils/selectors'

import { initState } from './store'

const extSelector = createSelector(
  extensionSelectorFactory('poi-plugin-next-door'),
  ext => _.isEmpty(ext) ? initState : ext
)

const readySelector = createSelector(
  extSelector,
  ext => ext.ready
)

const logsSelector = createSelector(
  extSelector,
  ext => ext.logs
)

const disabledTypesSelector = createSelector(
  extSelector,
  ext => ext.disabledTypes
)

export {
  extSelector,
  readySelector,
  logsSelector,
  disabledTypesSelector,
}
