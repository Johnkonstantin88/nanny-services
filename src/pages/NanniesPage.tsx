import { FC, useEffect } from 'react';
import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import CardList from '../components/CardList';
import Button from '../components/Button';
import { useGetNanniesData } from '../hooks';
import { IDocument } from '../types/data.types';
import { getCountCollectionDocs } from '../firebase/services/docs';

export interface NanniesPageProps {}

const NanniesPage: FC<NanniesPageProps> = () => {
  const queryClient = useQueryClient();
  const getNannies = useGetNanniesData();

  const { data: nanniesData } = useSuspenseQuery({
    queryKey: ['nannies'],
    queryFn: getNannies,
    structuralSharing: false,
    staleTime: 60 * 60 * 1000,
  });

  console.log(nanniesData);

  const getNext = async () => {
    const docs = await queryClient.fetchQuery({
      queryKey: ['nannies'],
      queryFn: getNannies,
    });
    console.log(nanniesData);

    queryClient.setQueryData(
      ['nannies'],
      [...(nanniesData as IDocument[]), ...docs]
    );
  };

  const { data: totalDocs } = useQuery({
    queryKey: ['total-docs-nannies'],
    queryFn: getCountCollectionDocs,
  });

  return (
    <main className="pt-16 pb-25 bg-(--color-white-bg)">
      <title>Nannies</title>
      <section className="section-container ">
        <CardList nanniesData={nanniesData} />
        {totalDocs && totalDocs > nanniesData.length && (
          <Button
            type="button"
            className="block max-w-[159px] px-10 py-3.5 text-[16px] text-white-main font-normal -tracking-1 leading-6
     bg-green-main rounded-[30px] mx-auto mt-16"
            onClick={() => getNext()}
          >
            Load more
          </Button>
        )}
      </section>
    </main>
  );
};

export default NanniesPage;
