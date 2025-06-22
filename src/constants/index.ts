import { where } from 'firebase/firestore';
import { INanniesFilters, ISelectOption } from '../types/filters.types';

export const QUERY_KEY = {
  appointmentCreds: 'appointment-creds',
  favoritesId: 'favorites-id',
  favorites: 'favorites',
  filters: 'filters',
  lastVisibleDoc: 'last-visible-doc',
  modalState: 'modal-state',
  nannies: 'nannies',
  totalNanniesDocs: 'total-nannies-docs',
  user: 'user',
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

export const initialModalState = {
  isAppointment: false,
  isLogin: false,
  isRegister: false,
};

export const nanniesSelectOptions: ISelectOption[] = [
  { value: SELECT_VALUES.nameAsc, label: 'A to Z' },
  { value: SELECT_VALUES.nameDesc, label: 'Z to A' },
  { value: SELECT_VALUES.lessThan, label: 'Less than 18$' },
  { value: SELECT_VALUES.greaterThan, label: 'Greater than 18$' },
  { value: SELECT_VALUES.popular, label: 'Popular' },
  { value: SELECT_VALUES.notPopular, label: 'Not popular' },
  { value: SELECT_VALUES.showAll, label: 'Show all' },
];

export const appointmentSelectOptions: ISelectOption[] = [
  { value: '09:00', label: '09:00' },
  { value: '09:30', label: '09:30' },
  { value: '10:00', label: '10:00' },
  { value: '10:30', label: '10:30' },
];
