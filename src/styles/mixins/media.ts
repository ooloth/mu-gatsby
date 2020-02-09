function customMediaQuery(minWidth: string): string {
  return `@media (min-width: ${minWidth})`
}

export const media = {
  sm: customMediaQuery('36em'),
  md: customMediaQuery('48em'),
  lg: customMediaQuery('62em'),
  xl: customMediaQuery('75em'),
  custom: customMediaQuery,
}

/*

USAGE:
=====

${media.sm} {
  padding-left: var(--s8);
  padding-right: var(--s8);
}

${media.custom('375px')} {
  color: pink;
}

*/
