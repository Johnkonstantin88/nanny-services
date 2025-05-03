import { FC } from 'react';
import Card from './Card';
import { FirebaseResponse } from '../types/firebase.types';

export interface CardListProps {
  nanniesData: FirebaseResponse[] | undefined;
}

const CardList: FC<CardListProps> = ({ nanniesData }) => {
  return (
    <ul className="flex flex-col gap-8">
      {nanniesData?.map(el => (
        <li key={el.birthday}>
          <Card {...el} />
        </li>
      ))}
    </ul>
  );
};

export default CardList;
