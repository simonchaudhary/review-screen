/**
 * Returns the acronym for a given text
 * @param text - The text to get the acronym from
 * @param limit - The maximum number of words to use
 * @returns The acronym
 * @example
 * getAcronym("Hello World") // "HW"
 * getAcronym("Hello World", 1) // "H"
 * getAcronym("Hello World", 2) // "HW"
 * getAcronym("Hello World", 3) // "HW"
 *
 */
export const getAcronym = (text: string, limit?: number): string => {
  return text
    .trim()
    .split(/\s+/)
    .slice(0, limit)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};
