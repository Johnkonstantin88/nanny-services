import { IDocument } from '../types/data.types';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { db } from '../firebase/firestoreConfig';
import { useLastVisibleState } from '../state/lastVisibleDoc';
import { FIREBASE_COLLECTION } from '../constants';

// import data from '../firebase/babysitters.json';

// const uploadData = () => {
//   const newNannyRef = collection(db, 'nannies');
//   data.map(doc =>
//     setTimeout(async () => {
//       await addDoc(newNannyRef, {
//         documentDetails: doc,
//         createdAt: serverTimestamp(),
//       });
//     }, 1000)
//   );
// };

// uploadData();

export const useGetNanniesData = () => {
  const { data: lastVisibleDoc, setData } = useLastVisibleState();

  const nanniesCollection = collection(db, FIREBASE_COLLECTION.nannies);

  const getNannies = async (): Promise<IDocument[]> => {
    console.log('fetched');
    const q = query(
      nanniesCollection,
      limit(3),
      orderBy('createdAt'),
      ...(lastVisibleDoc ? [startAfter(lastVisibleDoc)] : [])
    );
    const documentSnapshots = await getDocs(q);

    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    setData(lastVisible);

    const response = documentSnapshots.docs.map(
      doc => ({ ...doc.data(), id: doc.id } as IDocument)
    );

    return response;
  };

  return getNannies;
};
