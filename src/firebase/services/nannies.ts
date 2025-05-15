// import {
//   collection,
//   DocumentData,
//   getDocs,
//   limit,
//   orderBy,
//   query,
//   startAfter,
// } from 'firebase/firestore';
// import { db } from '../firestoreConfig';
// import { ICard } from '../../types/data.types';

// export const getNannies = async (): Promise<ICard[]> => {
//   const nanniesCollection = collection(db, 'nannies');
//   const firstPage = query(nanniesCollection, limit(3));
//   const documentSnapshots = await getDocs(firstPage);

//   const response = documentSnapshots.docs.map(doc => doc.data() as ICard);

//   return response;
// };

// export const getNextNannies = async (): Promise<ICard[]> => {
//   const nanniesCollection = collection(db, 'nannies');
//   const firstPage = query(nanniesCollection, limit(3));
//   const documentSnapshots = await getDocs(firstPage);
//   const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
//   const next = query(
//     nanniesCollection,
//     limit(3),
//     orderBy('birthday'),
//     startAfter(lastVisible || 0)
//   );
//   const nextSnapshots = await getDocs(next);

//   const response = nextSnapshots.docs.map(doc => doc.data() as ICard);

//   return response;
// };

// const getNextNannies = async () => {
//   const nanniesRef = collection(db, 'nannies');
//   const first = query(nanniesRef, limit(3));
//   console.log(first);
//   const documentSnapshots = await getDocs(first);
//   documentSnapshots.forEach(doc => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, ' => ', doc.data());
//   });
//   const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
//   console.log('last', lastVisible);
//   const next = query(
//     nanniesRef,
//     limit(3),
//     orderBy('name'),
//     startAfter(lastVisible)
//   );
//   const nextNannies = await getDocs(next);
//   nextNannies.forEach(doc => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, ' => ', doc.data());
//   });
// };

// getNextNannies();
