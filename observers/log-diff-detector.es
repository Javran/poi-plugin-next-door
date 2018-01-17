import React from 'react'
import { observer } from 'redux-observers'
import { enumFromTo } from 'subtender'
import { store } from 'views/create-store'

import {
  logsSelector,
  disabledTypesSelector,
} from '../selectors'

const logEquals = (l1, l2) =>
  l1.api_message === l2.api_message &&
  l1.api_type === l2.api_type

const computeNewRange = (cur, prev) => {
  let offset
  // test whether cur[offset..] matches prev[0..]
  for (offset = 0; offset < cur.length; ++offset) {
    let flag = true
    for (let i = 0; flag && (offset+i < cur.length) && (i < prev.length); ++i) {
      if (!logEquals(cur[offset+i],prev[i]))
        flag = false
    }
    if (flag)
      // content from 0 to offset-1 of cur are new
      return offset-1
  }
  // all contents are new
  return cur.length-1
}

const logDiffDetector = observer(
  logsSelector,
  (_dispatch, current, previous) => {
    const indMax = computeNewRange(current, previous)
    const logsRaw = enumFromTo(0,indMax).map(i => current[i])
    const disabledTypes = disabledTypesSelector(store.getState())
    const logs = logsRaw.filter(l => !disabledTypes.includes(l.api_type))
    if (logs.length > 0) {
      const {toast} = window
      const content = (
        <div>
          {logs.map(l => (
            <div key={l.api_no}>
              {l.api_message}
            </div>
          ))}
        </div>
      )
      toast(content)
    }
  }
)

export { logDiffDetector }
