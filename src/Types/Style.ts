export type FontSizes<T extends string> = Record<T, FontSizeStyle>;

interface FontSizeStyle {
  desktop: number;
  tablet: number;
  mobile: number;
}
