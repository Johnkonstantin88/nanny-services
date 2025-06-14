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
  const isLastVisible = lastVisibleDoc ? [startAfter(lastVisibleDoc)] : [];

  let filteredQuery = query(q, orderBy(FILTERS.orderByDate), ...isLastVisible);

  if (filters === SELECT_VALUES.showAll) return filteredQuery;

  if (filters === SELECT_VALUES.nameAsc) {
    filteredQuery = query(q, orderBy(FILTERS.orderByName), ...isLastVisible);
  }

  if (filters === SELECT_VALUES.nameDesc) {
    filteredQuery = query(
      q,
      orderBy(FILTERS.orderByName, 'desc'),
      ...isLastVisible
    );
  }

  if (filters === SELECT_VALUES.greaterThan) {
    filteredQuery = query(
      q,
      where(FILTERS.pricePerHour, '>=', 18),
      ...isLastVisible
    );
  }

  if (filters === SELECT_VALUES.lessThan) {
    filteredQuery = query(
      q,
      where(FILTERS.pricePerHour, '<', 18),
      ...isLastVisible
    );
  }

  if (filters === SELECT_VALUES.popular) {
    filteredQuery = query(
      q,
      where(FILTERS.rating, '>=', 4.75),
      orderBy(FILTERS.rating, 'desc'),
      ...isLastVisible
    );
  }

  if (filters === SELECT_VALUES.notPopular) {
    filteredQuery = query(
      q,
      where(FILTERS.rating, '<', 4.75),
      orderBy(FILTERS.rating),
      ...isLastVisible
    );
  }

  return filteredQuery;
};

export default getFilteredFirestoreQuery;
