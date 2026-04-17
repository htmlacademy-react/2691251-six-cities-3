import ReviewItem from '../review-item/review-item';
import { Review } from '../../types/review';

type ReviewListProps = {
  reviews: Review[];
}

function ReviewsList({ reviews }: ReviewListProps): JSX.Element {

  return (
    <ul className="reviews__list">
      {reviews.map((review, id) => {
        const keyValue = `${id}-${review.id}`;
        return (
          <ReviewItem key={keyValue} review={review} />
        );
      })}
    </ul>);
}

export default ReviewsList;
