/**
 * Returns the element id for a given prefix and id
 * @param prefix - The prefix to use
 * @param id - The id to use
 * @returns The element id
 * @example
 * getElementId("section", 1) // "section-1"
 */
export const getElementId = (prefix: string, id: number | string) => {
  return `${prefix}-${id}`;
};
