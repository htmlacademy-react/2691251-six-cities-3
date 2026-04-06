import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offer';
import { useAppSelector } from '../../hooks';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';

function FavoritesPage(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);

  const filteredOffers = offers.filter((offer) => offer.isFavorite === true);

  const uniqCities: string[] = [];
  filteredOffers.forEach((element: Offer) => {
    if (element.city.name !== uniqCities[uniqCities.length - 1]) {
      uniqCities.push(element.city.name);
    }
  });

  return (


    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">{filteredOffers.length}</span>
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
      {filteredOffers.length === 0 ? <FavoritesEmpty /> :
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {uniqCities.map((city, id) => {
                  const keyValue = `${id}-${city}`;
                  return (
                    <li key={keyValue} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link className="locations__item-link" to="#">
                            <span>{city}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {filteredOffers.filter((offer) => offer.city.name === city).map((offer, offerId) => {
                          const keyOffer = `${offerId}-${offer.id}`;
                          return (
                            <article key={keyOffer} className="favorites__card place-card">
                              <div className="place-card__mark">
                                <span>Premium</span>
                              </div>
                              <div className="favorites__image-wrapper place-card__image-wrapper">
                                <Link to="#">
                                  <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image" />
                                </Link>
                              </div>
                              <div className="favorites__card-info place-card__info">
                                <div className="place-card__price-wrapper">
                                  <div className="place-card__price">
                                    <b className="place-card__price-value">&euro;{offer.price}</b>
                                    <span className="place-card__price-text">&#47;&nbsp;night</span>
                                  </div>
                                  <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                                    <svg className="place-card__bookmark-icon" width="18" height="19">
                                      <use xlinkHref="#icon-bookmark"></use>
                                    </svg>
                                    <span className="visually-hidden">In bookmarks</span>
                                  </button>
                                </div>
                                <div className="place-card__rating rating">
                                  <div className="place-card__stars rating__stars">
                                    <span style={{ width: '100%' }}></span>
                                    <span className="visually-hidden">Rating</span>
                                  </div>
                                </div>
                                <h2 className="place-card__name">
                                  <Link to="#">{offer.title}</Link>
                                </h2>
                                <p className="place-card__type">{offer.type}</p>
                              </div>
                            </article>
                          );
                        }
                        )}
                      </div>
                    </li>
                  );
                }
                )}
              </ul>
            </section>
          </div>
        </main>}
      <footer className="footer container">
        <Link className="footer__logo-link" to="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>);
}

export default FavoritesPage;
