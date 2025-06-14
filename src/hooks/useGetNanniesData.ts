import { IDocument } from '../types/data.types';
import { DocumentData, getDocs } from 'firebase/firestore';
import { QUERY_KEY } from '../constants';
import { useQueryClient } from '@tanstack/react-query';
import getFilteredFirestoreQuery from '../utils/getFilteredQuery';

export const useGetNanniesData = () => {
  const queryClient = useQueryClient();
  const selectValue: string | undefined = queryClient.getQueryData([
    QUERY_KEY.filters,
  ]);
  const lastVisibleDoc: DocumentData | undefined = queryClient.getQueryData([
    QUERY_KEY.lastVisibleDoc,
    selectValue,
  ]);

  const getNannies = async (filters?: string): Promise<IDocument[]> => {
    const filteredQuery = getFilteredFirestoreQuery(filters, lastVisibleDoc);
    const documentSnapshots = await getDocs(filteredQuery);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    if (selectValue)
      queryClient.setQueryData(
        [QUERY_KEY.lastVisibleDoc, selectValue],

        lastVisible
      );

    const response = documentSnapshots.docs.map(
      doc => ({ ...doc.data(), id: doc.id } as IDocument)
    );

    return response;
  };

  return getNannies;
};
