import { writable } from "svelte/store";

const sectors = ["hobby", "friendship", "health", "job", "love", "rich"];

const defaultStore = sectors.map(sector => ({
  name: sector,
  value: 0
}));

const STORAGE_NAME = "svelte-app-radar";

function Store() {
  const storeJSON = localStorage.getItem(STORAGE_NAME) || "";
  let store = {};

  try {
    store = JSON.parse(storeJSON);
  } catch (e) {
    store = defaultStore;
  }

  const { subscribe, update } = writable(store);

  return {
    subscribe,
    set: (name, value) => {
      update(store => {
        const stores = store.map(item =>
          item.name === name ? { ...item, value } : item
        );

        const storesJSON = JSON.stringify(stores);

        localStorage.setItem(STORAGE_NAME, storesJSON);

        return stores;
      });
    }
  };
}

export const radarStore = Store();
export const activeSector = writable(null);
