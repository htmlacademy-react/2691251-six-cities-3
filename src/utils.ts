import { Review } from './types/review';

export function sortReviewsByDate(a: Review, b: Review) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}
