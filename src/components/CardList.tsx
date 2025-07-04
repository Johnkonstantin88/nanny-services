import { FC } from 'react';
import Card from './Card';
import { IDocument } from '../types/data.types';

export interface CardListProps {
  nanniesData: IDocument[] | undefined;
}

const CardList: FC<CardListProps> = ({ nanniesData }) => {
  return (
    <>
      <ul className="flex flex-col gap-8">
        {nanniesData?.map(el => (
          <li key={el.id}>
            <Card {...el} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default CardList;
