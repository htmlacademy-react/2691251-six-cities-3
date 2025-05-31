import OffersList from '../../components/offers-list/offers-list';
import SortList from '../../components/sort-list/sort-list';
import { AppRoute, citiesList } from '../../const';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { CITIES } from '../../mocks/cities';
import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import CitiesList from '../../components/cities-list/cities-list';

function MainPage(): JSX.Element {
  const allOffers = useAppSelector((state) => state.offers);

  const [activeId, setActiveId] = useState<string>();

  const selectedCity = useAppSelector((state) => state.city);

  const offers = allOffers.filter((offer) => offer.city.name === selectedCity);

  const handleChangeActiveId = (id?: string) => setActiveId(id);

  // для теста выводим в консоль и отключаем линтер
  console.log(activeId); //eslint-disable-line no-console

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to='#' className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoute.Login}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList citiesList={citiesList} selectedCity={selectedCity} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {selectedCity}</b>
              <SortList />
              <div className="cities__places-list places__list tabs__content">
                < OffersList
                  onHandleChangeActiveId={handleChangeActiveId}
                  offers={offers}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section
                style={{ width: '100%' }}
                className={`${offers.length === 0 ? 'cities__map' : ''} map`}
              >
                <Map
                  city={CITIES[3]}
                  offers={offers}
                />

              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
