import {
  collection,
  DocumentData,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { FILTERS, FIREBASE_COLLECTION, SELECT_VALUES } from '../constants';
import { db } from '../firebase/firestoreConfig';

const getFilteredFirestoreQuery = (
  filters?: string,
  lastVisibleDoc?: DocumentData
) => {
  const nanniesCollection = collection(db, FIREBASE_COLLECTION.nannies);
  const q = query(nanniesCollection, limit(3));
  const marker = lastVisibleDoc ? [startAfter(lastVisibleDoc)] : [];

  let filteredQuery = query(q, orderBy(FILTERS.orderByDate), ...marker);

  if (filters === SELECT_VALUES.showAll) return filteredQuery;

  if (filters === SELECT_VALUES.nameAsc) {
    filteredQuery = query(q, orderBy(FILTERS.orderByName), ...marker);
  }

  if (filters === SELECT_VALUES.nameDesc) {
    filteredQuery = query(q, orderBy(FILTERS.orderByName, 'desc'), ...marker);
  }

  if (filters === SELECT_VALUES.greaterThan) {
    filteredQuery = query(q, where(FILTERS.pricePerHour, '>=', 18), ...marker);
  }

  if (filters === SELECT_VALUES.lessThan) {
    filteredQuery = query(q, where(FILTERS.pricePerHour, '<', 18), ...marker);
  }

  if (filters === SELECT_VALUES.popular) {
    filteredQuery = query(
      q,
      where(FILTERS.rating, '>=', 4.75),
      orderBy(FILTERS.rating, 'desc'),
      ...marker
    );
  }

  if (filters === SELECT_VALUES.notPopular) {
    filteredQuery = query(
      q,
      where(FILTERS.rating, '<', 4.75),
      orderBy(FILTERS.rating),
      ...marker
    );
  }

  return filteredQuery;
};

export default getFilteredFirestoreQuery;
