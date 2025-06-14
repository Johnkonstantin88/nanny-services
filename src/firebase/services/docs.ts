import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firestoreConfig';
import { IUser } from '../../types/auth.types';
import {
  COUNT_DOCS_FILTERS,
  FIREBASE_COLLECTION,
  SELECT_VALUES,
} from '../../constants';
import { IDocument } from '../../types/data.types';

export const setFirebaseUserDoc = (creds: IUser) =>
  setDoc(doc(db, FIREBASE_COLLECTION.users, creds.uid), {
    ...creds,
    favorites: [],
  });

export const getCountCollectionDocs = async (
  collName: string,
  filters?: string
) => {
  const coll = collection(db, collName);
  let q = query(coll);

  if (filters === SELECT_VALUES.greaterThan) {
    q = query(coll, COUNT_DOCS_FILTERS.greaterThan);
  }
  if (filters === SELECT_VALUES.lessThan) {
    q = query(coll, COUNT_DOCS_FILTERS.lessThan);
  }
  if (filters === SELECT_VALUES.popular) {
    q = query(coll, COUNT_DOCS_FILTERS.popular);
  }
  if (filters === SELECT_VALUES.notPopular) {
    q = query(coll, COUNT_DOCS_FILTERS.notPopular);
  }

  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};

export const getDocument = async <T>(collName: string, id: string) => {
  const docRef = doc(db, collName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id } as T;
  } else {
    console.log(`No document with id: ${id}!`);
  }
};

export const toggleFavorite = async (
  isFavorite: boolean,
  userId: string,
  id: string
) => {
  try {
    const usersRef = doc(db, FIREBASE_COLLECTION.users, userId);
    isFavorite
      ? await updateDoc(usersRef, {
          favorites: arrayRemove(id),
        })
      : await updateDoc(usersRef, {
          favorites: arrayUnion(id),
        });
  } catch (error) {
    console.log(error);
  }
};

export const getFavoritesDocs = async (arr: string[]) => {
  try {
    const fetchPromises: Promise<IDocument | undefined>[] = [];
    arr?.forEach(docId => {
      const doc: Promise<IDocument | undefined> = getDocument(
        FIREBASE_COLLECTION.nannies,
        docId
      );
      fetchPromises.push(doc);
    });

    const favorites = await Promise.all(fetchPromises);

    return favorites;
  } catch (error) {
    console.log(error);
  }
};
