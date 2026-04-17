import { Review } from './types/review';

export function sortReviewsByDate(a: Review, b: Review) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export const getRandomInteger = (min: number, max: number) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

