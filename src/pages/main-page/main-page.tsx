import OffersList from '../../components/offers-list/offers-list';
import SortList from '../../components/sort-list/sort-list';
import Header from '../../components/header/header';
import { useState } from 'react';
import { CITIES } from '../../const';
import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import CitiesList from '../../components/cities-list/cities-list';
import { SortOption } from '../../components/sort-list/const';
import { Offer } from '../../types/offer';
import MainEmpty from '../../components/main-empty/main-empty';
import { getOffers } from '../../store/app-data/selectors';
import { getCity } from '../../store/app-process/selectors';
import { offersActions } from '../../store/app-data/app-data';
import { useActionCreators } from '../../hooks/store';
import { RequestStatus } from '../../const';
import { getStatus } from '../../store/app-data/selectors';
import { useEffect } from 'react';

function MainPage(): JSX.Element {
  const selectedCity = useAppSelector(getCity);

  const [activeSort, setActiveSort] = useState(SortOption.Popular);

  const allOffers = useAppSelector(getOffers);

  const offers = allOffers.filter((offer) => offer.city.name === selectedCity.name);

  let sortedOffers = offers;

  if (activeSort === SortOption.PriceLowToHigh) {
    sortedOffers = offers.toSorted((a: Offer, b: Offer) => a.price - b.price);
  }
  if (activeSort === SortOption.PriceHighToLow) {
    sortedOffers = offers.toSorted((a: Offer, b: Offer) => b.price - a.price);
  }
  if (activeSort === SortOption.TopRatedFirst) {
    sortedOffers = offers.toSorted((a: Offer, b: Offer) => b.rating - a.rating);
  }

  const [activeId, setActiveId] = useState<string>();

  const handleChangeActiveId = (id?: string) => setActiveId(id);

  const status = useAppSelector(getStatus);

  const { fetchOffersAction } = useActionCreators(offersActions);

  useEffect(() => {
    if (status === RequestStatus.Idle) {
      fetchOffersAction();
    }
  }, [status, fetchOffersAction]);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <Header />
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList citiesList={CITIES} selectedCity={selectedCity} />
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container ${(offers.length === 0) ? 'cities__places-container--empty' : ''} container`}>
            {(offers.length === 0) && <MainEmpty selectedCityName={selectedCity.name} />}
            {(offers.length > 0) &&
              <>
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.length} places to stay in {selectedCity.name}</b>
                  <SortList current={activeSort} setter={setActiveSort} />
                  <div className="cities__places-list places__list tabs__content">
                    < OffersList
                      onHandleChangeActiveId={handleChangeActiveId}
                      offers={sortedOffers}
                    />
                  </div>
                </section>
                <div className="cities__right-section">
                  <section
                    style={{ width: '100%' }}
                    className={`${offers.length === 0 ? 'cities__map' : ''} map`}
                  >
                    {offers.length === 0 ? '' :
                      <Map
                        city={selectedCity}
                        offers={offers}
                        activeId={activeId}
                      />}
                  </section>
                </div>
              </>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
