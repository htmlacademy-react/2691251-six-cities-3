import { useState, FormEvent, ChangeEvent } from 'react';
import { FullOffer } from '../../types/offer';
import { reviewsActions } from '../../store/review/review';
import { useAppDispatch } from '../../hooks';
import { toast } from 'react-toastify';

type ReviewsFormProps = {
  offerId: FullOffer['id'] | undefined;
}

type Form = HTMLFormElement & {
  rating: RadioNodeList;
  review: HTMLTextAreaElement;
}

const MAX_COMMENT_LENGTH = 300;
const MIN_COMMENT_LENGTH = 50;

function ReviewForm({ offerId }: ReviewsFormProps): JSX.Element {

  const dispatch = useAppDispatch();

  const [userReview, setUserReview] = useState({
    rating: '',
    review: '',
    isformDisabled: false
  });

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const form = evt.currentTarget as Form;
    const reviewContent = {
      body: {
        comment: userReview.review,
        rating: Number(userReview.rating)
      },
      offerId
    };
    setUserReview({ ...userReview, isformDisabled: true });
    toast.promise(dispatch(reviewsActions.postReview(reviewContent)).unwrap(), {
      pending: 'Sending',
      success: {
        render: () => {
          setUserReview({ review: '', rating: '', isformDisabled: false });
          form.reset();
          return 'Sent!';
        }
      },
      error: {
        render() {
          setUserReview({ ...userReview, isformDisabled: false });
          return 'Failed to send';
        }
      }
    });
  };

  const submitFlags = [!userReview.rating, userReview.review.length < MIN_COMMENT_LENGTH, userReview.isformDisabled, userReview.review.length > MAX_COMMENT_LENGTH];
  const isSubmitDisabled = submitFlags.some((element) => element === true);

  return (
    <form className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" disabled={userReview.isformDisabled}
          onInput={(evt: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = evt.target;
            setUserReview({ ...userReview, [name]: value });
          }}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" disabled={userReview.isformDisabled}
          onInput={(evt: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = evt.target;
            setUserReview({ ...userReview, [name]: value });
          }}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" disabled={userReview.isformDisabled}
          onInput={(evt: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = evt.target;
            setUserReview({ ...userReview, [name]: value });
          }}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" disabled={userReview.isformDisabled}
          onInput={(evt: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = evt.target;
            setUserReview({ ...userReview, [name]: value });
          }}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-stars" type="radio" disabled={userReview.isformDisabled}
          onInput={(evt: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = evt.target;
            setUserReview({ ...userReview, [name]: value });
          }}
        />
        <label htmlFor="1-stars" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        minLength={MIN_COMMENT_LENGTH}
        required
        disabled={userReview.isformDisabled}
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => {
          const { name, value } = evt.target;
          setUserReview({ ...userReview, [name]: value });
        }}
      >

      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">`{MIN_COMMENT_LENGTH}` characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >Submit
        </button>
      </div>
    </form>);
}

export default ReviewForm;
