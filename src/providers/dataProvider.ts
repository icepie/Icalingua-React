import { createStoreHook } from 'react-redux'

let dataStore = initDataStore()

export function initDataStore() {
  return createStoreHook()
}

export const getDataStore = () => dataStore
