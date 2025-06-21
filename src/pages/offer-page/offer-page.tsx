import ReviewForm from '../../components/review-form/review-form';
import NearOffersList from '../../components/near-offers-list/near-offers-list';
import Map from '../../components/map/map';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import LoadingPage from '../loading-page/loading-page';
import { RequestStatus } from '../../const';
import { useActionCreators } from '../../hooks/store';
import { AuthorizationStatus } from '../../const';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getOffers } from '../../store/app-data/selectors';
import { offerActions } from '../../store/offer/offer';
import { reviewsActions } from '../../store/review/review';
import { getFullOffer, getNearByOffers, getOfferStatus } from '../../store/offer/selectors';
import { getReviews } from '../../store/review/selectors';
import OfferContainer from '../../components/offer-contanier/offer-container';
import NotFoundPage from '../not-found-page/not-found-page';

const MAX_COUNT_NEAR_OFFERS = 3;

const allActions = {
  ...offerActions,
  ...reviewsActions
};

function OfferPage(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const fullOffer = useAppSelector(getFullOffer);
  const status = useAppSelector(getOfferStatus);
  const nearByOffers = useAppSelector(getNearByOffers);
  const reviews = useAppSelector(getReviews);

  const offers = useAppSelector(getOffers);

  const { setActiveId, fetchNearByOffers, fetchFullOffer, fetchReviews, clearOffer } =
    useActionCreators(allActions);

  const { id } = useParams() as { id: string };

  useEffect(() => {
    if (status === RequestStatus.Idle) {
      setActiveId(id);
      Promise.all([fetchFullOffer(id), fetchNearByOffers(id), fetchReviews(id)]);
    }
  }, [fetchFullOffer, setActiveId, fetchNearByOffers, fetchReviews, id, status]);

  useEffect(() => {
    clearOffer();
  }, [id, clearOffer]);

  if (status === RequestStatus.Failed) {
    return <NotFoundPage />;
  }

  if (status === RequestStatus.Loading || !fullOffer) {
    return <LoadingPage />;
  }

  const slicedNearByOffers = nearByOffers && nearByOffers.slice(0, MAX_COUNT_NEAR_OFFERS);
  const nearOffersPlusCurrent = [fullOffer, ...slicedNearByOffers];

  return (
    <div className="page">
      <header className="header">
        <Header />
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={fullOffer.images} />
          <div className="offer__container container">
            <div className="offer__wrapper">
              <OfferContainer offer={fullOffer} />
              <section className="offer__reviews reviews">
                {reviews && reviews.length > 0 &&
                  <>
                    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                    <ReviewsList reviews={reviews} />
                  </>}
                {authorizationStatus === AuthorizationStatus.Auth && < ReviewForm offerId={fullOffer.id} />}
              </section>
            </div>
          </div>
          <section
            style={{ width: '100%' }}
            className={`${offers.length === 0 ? 'offer__map map' : ''} map`}
          >
            <Map
              city={fullOffer.city}
              offers={nearOffersPlusCurrent}
              activeId={fullOffer.id}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <NearOffersList offers={slicedNearByOffers} />
            </div>
          </section>
        </div>
      </main>
    </div>);
}


export default OfferPage;
