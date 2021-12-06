export enum StorageItem {
  Auth = 'App/auth',
  AuthUser = 'App/auth/user',
  AuthToken = 'App/auth/token',
  Settings = 'App/settings',
  Alerts = 'App/alerts',
}

export const getItem = (itemName: StorageItem): unknown | null => {
  const item = localStorage.getItem(itemName);
  return item ? JSON.parse(item) : null;
};

export const setItem = (itemName: StorageItem, value: unknown): void => {
  localStorage.setItem(itemName, JSON.stringify(value));
};

export const removeItem = (itemName: StorageItem): void => {
  localStorage.removeItem(itemName);
};
