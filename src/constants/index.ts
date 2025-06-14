import { where } from 'firebase/firestore';
import { INanniesFilters } from '../types/filters.types';

export const QUERY_KEY = {
  nannies: 'nannies',
  user: 'user',
  lastVisibleDoc: 'last-visible-doc',
  totalNanniesDocs: 'total-nannies-docs',
  favoritesId: 'favorites-id',
  favorites: 'favorites',
  filters: 'filters',
};

export const FIREBASE_COLLECTION = {
  nannies: 'nannies',
  users: 'users',
};

export const SELECT_VALUES: INanniesFilters = {
  nameAsc: 'name-asc',
  nameDesc: 'name-desc',
  lessThan: 'less-than-18$',
  greaterThan: 'greater-than-18$',
  popular: 'popular',
  notPopular: 'not-popular',
  showAll: 'show-all',
};

export const FILTERS = {
  orderByDate: 'createdAt',
  orderByName: 'documentDetails.name',
  pricePerHour: 'documentDetails.price_per_hour',
  rating: 'documentDetails.rating',
};

export const COUNT_DOCS_FILTERS = {
  greaterThan: where(FILTERS.pricePerHour, '>=', 18),
  lessThan: where(FILTERS.pricePerHour, '<', 18),
  popular: where(FILTERS.rating, '>=', 4.75),
  notPopular: where(FILTERS.rating, '<', 4.75),
};
