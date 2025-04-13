type ColorMap = Record<number, string>;

type ColorParams = {
  lightness?: number;
  opacity?: number;
  saturation?: number;
};

/**
 * Generates a color map with n colors using the golden ratio.
 * @param n The number of colors to generate.
 * @param params Optional parameters for lightness, opacity, and saturation.
 * @returns A color map with n colors.
 */
export function generateColorMap(
  n: number,
  params: ColorParams = {}
): ColorMap {
  const colorMap: ColorMap = {};
  const goldenRatioConjugate = 0.618033988749895;
  let hue = 0.25;

  const { lightness = 50, opacity = 1, saturation = 70 } = params;

  for (let i = 1; i <= n; i++) {
    hue += goldenRatioConjugate;
    hue %= 1;
    const h = Math.floor(hue * 360);

    colorMap[i] = `hsla(${h}, ${saturation}%, ${lightness}%, ${opacity})`;
  }

  return colorMap;
}
