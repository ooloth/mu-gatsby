function customMediaQuery(minWidthInEms: number) {
  return `@media (min-width: ${minWidthInEms}em)`
}

export const media = {
  sm: customMediaQuery(36),
  md: customMediaQuery(48),
  lg: customMediaQuery(62),
  xl: customMediaQuery(75),
  custom: customMediaQuery,
}

/*

USAGE:
=====

${media.sm} {
  padding-left: var(--s8);
  padding-right: var(--s8);
}

*/
