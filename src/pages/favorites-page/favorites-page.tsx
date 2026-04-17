import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import { Offer } from '../../types/offer';
import { useAppSelector } from '../../hooks';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import { getFavorites } from '../../store/favorites/selectors';
import { CardClass } from '../../const';
import Card from '../../components/card/card';

function FavoritesPage(): JSX.Element {
  const offers = useAppSelector(getFavorites);

  const uniqCities: string[] = [];
  offers.forEach((element: Offer) => {
    if (element.city.name !== uniqCities[uniqCities.length - 1]) {
      uniqCities.push(element.city.name);
    }
  });

  return (
    <div className={`page ${offers.length === 0 ? 'page--favorites-empty' : ''}`}>
      <header className="header">
        <Header />
      </header>
      {offers.length === 0 && <FavoritesEmpty />}
      {offers.length > 0 &&
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
                        {offers.filter((offer) => offer.city.name === city).map((offer, offerId) => {
                          const keyOffer = `${offerId}-${offer.id}`;
                          return (
                            <Card
                              offer={offer}
                              key={keyOffer}
                              cardClass={CardClass.Favorites}
                            />

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
      <footer className={`footer ${offers.length === 0 ? '' : 'container'}`}>
        <Link className="footer__logo-link" to="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>);
}

export default FavoritesPage;
