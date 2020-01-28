import Router, { NextRouter } from 'next/router';

export function updateFilters(
  name: string,
  value: any,
  preserveSpace = false,
): Promise<any> {
  console.log('filter', name, value);
  let savable;
  if (preserveSpace) {
    savable = `"${value}"`;
  } else {
    savable = value;
  }
  return Router.push(
    {
      pathname: Router.pathname,
      query: {
        ...Router.query,
        [name]: savable,
      },
    },
    undefined,
    { shallow: true },
  );
}

export function retrieveFilter(
  router: NextRouter,
  name: string,
  preserveSpace = false,
): string {
  let value;
  if (preserveSpace) {
    value = router.query[name] ? router.query[name].slice(1, -1) : '';
  } else {
    value = router.query[name] || '';
  }
  return value as string;
}
