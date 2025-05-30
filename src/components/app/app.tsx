import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { initOffers } from '../../store/action';
import { offers as mockOffers } from '../../mocks/offers';
// импортировали моковые офферы

type AppProps = {
  offersCount: number;
}

function App({ offersCount }: AppProps): JSX.Element {

  const dispatch = useAppDispatch();
  dispatch(initOffers({ offers: mockOffers }));
  // внесли моковые офферы в состояние
  const offers = useAppSelector((state) => state.offers);
  // и тут же использовали офферы из состояния
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage offersCount={offersCount} offers={offers} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <FavoritesPage offers={offers} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.OfferWithId}
          element={<OfferPage offers={offers} authorizationStatus={AuthorizationStatus.Auth} />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
