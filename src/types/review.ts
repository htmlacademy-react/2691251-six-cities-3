import { FullOffer } from './offer';
import { RequestStatus } from '../const';

export type Review = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
};

export type ReviewState = {
  items: Review[];
  status: RequestStatus;
};

export type PostCommentProps = {
  body: {
    comment: string;
    rating: number;
  };
  offerId: FullOffer['id'] | undefined;
}

