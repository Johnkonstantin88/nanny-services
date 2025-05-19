import { Timestamp } from 'firebase/firestore';

export interface IDocument {
  createdAt: Timestamp;
  documentDetails: ICard;
  id: string;
}

export interface IFirebaseResponse {
  docs: IDocument[];
  totalDocs: number;
}

export interface ICard {
  about: string;
  avatar_url: string;
  birthday: string;
  characters: string[];
  education: string;
  experience: string;
  kids_age: string;
  location: string;
  name: string;
  price_per_hour: number;
  rating: number;
  reviews: IReview[];
}

export interface IReview {
  comment: string;
  rating: number;
  reviewer: string;
}
