export const FOREIGN_LANGUAGE_OPTIONS_I = [
  "BOS111 - Spoken Bosnian I",
  "TURK111 - Spoken Turkish I",
];

export const FOREIGN_LANGUAGE_OPTIONS_II = [
  "BOS112 - Spoken Bosnian II",
  "TURK112 - Spoken Turkish II",
];

export function getForeignLanguageOptions(level: "I" | "II"): string[] {
  return level === "I" ? FOREIGN_LANGUAGE_OPTIONS_I : FOREIGN_LANGUAGE_OPTIONS_II;
}
