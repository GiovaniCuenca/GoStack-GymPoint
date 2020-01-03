import AsyncStorage from '@react-native-community/async-storage';

export const StorageService = {
  get,
  set,
  delete: remove,
};

async function get(key) {
  if (!key) return;

  const value = await AsyncStorage.getItem(key);

  return value;
}

async function set(key, value) {
  if (!key || !value) return;

  let parsedValue = value;

  if (parsedValue instanceof Array || parsedValue instanceof Object)
    parsedValue = JSON.stringify(parsedValue);
  else parsedValue = String(parsedValue);

  await AsyncStorage.setItem(key, parsedValue);
}

async function remove(key) {
  if (!key) return;

  await AsyncStorage.removeItem(key);
}
