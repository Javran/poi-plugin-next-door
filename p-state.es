import { ensureDirSync, readJsonSync, writeJsonSync } from 'fs-extra'
import { join } from 'path-extra'
import { createStructuredSelector } from 'reselect'
import { disabledTypesSelector } from './selectors'

const latestVersion = 'initial'

const pStateSelector = createStructuredSelector({
  disabledTypes: disabledTypesSelector,
})

const getPStateFilePath = () => {
  const {APPDATA_PATH} = window
  const path = join(APPDATA_PATH,'next-door')
  ensureDirSync(path)
  return join(path,`p-state.json`)
}

const savePState = pState => {
  const path = getPStateFilePath()
  try {
    const pStateWithVer = {...pState, $version: latestVersion}
    writeJsonSync(path,pStateWithVer)
  } catch (err) {
    console.error('Error while writing to p-state file', err)
  }
}

const updatePState = oldPState => {
  if (oldPState.$dataVersion === 'initial')
    return oldPState
  throw new Error('failed to update the config')
}

const loadPState = () => {
  try {
    return updatePState(readJsonSync(getPStateFilePath()))
  } catch (err) {
    if (err.syscall !== 'open' || err.code !== 'ENOENT') {
      console.error('Error while loading config', err)
    }
  }
  return null
}

export {
  pStateSelector,
  savePState,
  loadPState,
}
