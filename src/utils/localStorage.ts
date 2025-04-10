/**
 * Sets an item in localStorage with proper type handling
 * @param key - The key to store the data under
 * @param data - The data to store (can be any type)
 * @returns void
 */
export const setItem = <T>(key: string, data: T): void => {
  if (data === null || data === undefined) {
    localStorage.removeItem(key);
    return;
  }

  if (typeof data === "object") {
    localStorage.setItem(key, JSON.stringify(data));
    return;
  }

  localStorage.setItem(key, `${data}`);
};

/**
 * Retrieves an item from localStorage with proper type handling
 * @param key - The key to retrieve data from
 * @returns The retrieved data with the specified type, or null if not found
 */
export const getItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    return JSON.parse(item) as T;
  } catch {
    return item as unknown as T;
  }
};

/**
 * Clears all items from localStorage
 */
export const clearAll = (): void => {
  localStorage.clear();
};

/**
 * Removes a specific item from localStorage by key
 * @param key - The key of the item to remove
 */
export const removeItemByKey = (key: string): void => {
  localStorage.removeItem(key);
};
