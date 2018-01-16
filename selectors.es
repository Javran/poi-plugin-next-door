import _ from 'lodash'
import { createSelector } from 'reselect'
import {
  extensionSelectorFactory,
} from 'views/utils/selectors'

import { initState } from './store'

const extSelector = createSelector(
  extensionSelectorFactory('poi-plugin-next-door'),
  ext => _.isEmpty(ext) ? initState : ext)

const logsSelector = createSelector(
  extSelector,
  ext => ext.logs
)

export {
  extSelector,
  logsSelector,
}
