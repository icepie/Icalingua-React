import { createStoreHook } from 'react-redux'
import { Store } from 'redux'

let dataStore = initDataStore()

export function initDataStore() {
  return createStoreHook()
}

export const getDataStore = () => dataStore
