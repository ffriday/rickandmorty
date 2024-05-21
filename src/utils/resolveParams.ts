import type { LocationQueryValue, RouteLocationNormalizedLoaded } from 'vue-router';
import type { SearchParams } from './types';

export const resolveParam = (param?: LocationQueryValue | LocationQueryValue[]): string => {
  if (!param) return '';
  if (Array.isArray(param)) {
    return param[0] ? param[0].toString() : ''
  } else {
    return param.toString()
  }
}

export const resolveParams = (route: RouteLocationNormalizedLoaded): SearchParams => {
  const name = resolveParam(route.query.name)
  const status = resolveParam(route.query.status)
  const num = parseInt(resolveParam(route.query.page));
  const page = isNaN(num) ? 0 : num
  return { name, status, page }
}