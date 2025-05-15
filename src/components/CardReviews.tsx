import { FC, useRef } from 'react';
import CardReviewsItem from './CardReviewsItem';
import Button from './Button';
import { useToggleVisibility } from '../hooks';
import { IReview } from '../types/data.types';
import clsx from 'clsx';

export interface CardReviewsProps {
  reviews: IReview[];
}

export const CardReviews: FC<CardReviewsProps> = ({ reviews }) => {
  const [isVisible, toggleVisibility] = useToggleVisibility();
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Button
        type="button"
        className="text-[16px] font-medium leading-8 align-middle underline mt-3.5"
        onClick={toggleVisibility}
      >
        {isVisible ? 'Read less' : 'Read more'}
      </Button>
      <div
        ref={contentRef}
        className={clsx(
          'overflow-hidden transition-all primary-transition',
          isVisible
            ? 'visible opacity-100 pointer-events-auto:'
            : 'collapse opacity-0 pointer-events-none'
        )}
        style={
          isVisible
            ? { maxHeight: contentRef.current?.scrollHeight + 'px' }
            : { maxHeight: '0px' }
        }
      >
        <ul className="flex flex-col gap-[25px] mb-12 mt-2.5">
          {reviews.map((review, idx) => (
            <li key={idx} className="flex flex-col gap-4">
              <CardReviewsItem {...review} />
            </li>
          ))}
        </ul>

        <Button
          type="button"
          className="max-w-[215px] px-7 py-3.5 text-[16px] text-white-main font-normal -tracking-1 leading-6
     bg-green-main rounded-[30px] mr-3"
        >
          Make an appointment
        </Button>
      </div>
    </>
  );
};
