import { createStoreHook } from 'react-redux';

let dataStore;

export function initDataStore() {
  dataStore = createStoreHook();
}

export { dataStore };