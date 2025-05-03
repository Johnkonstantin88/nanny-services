import { FC } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getNannies } from '../firebase/services/nannies';
import CardList from '../components/CardList';

export interface NanniesPageProps {}

const NanniesPage: FC<NanniesPageProps> = () => {
  const { data: nanniesData } = useSuspenseQuery({
    queryKey: ['nannies'],
    queryFn: getNannies,
  });

  console.log(nanniesData);

  return (
    <main className="pt-16 pb-25 bg-(--color-white-bg)">
      <title>Nannies</title>
      <section className="section-container ">
        <CardList nanniesData={nanniesData} />
      </section>
    </main>
  );
};

export default NanniesPage;
