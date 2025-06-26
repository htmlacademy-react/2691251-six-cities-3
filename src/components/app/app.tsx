import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { useAppSelector } from '../../hooks';
import LoadingPage from '../../pages/loading-page/loading-page';
import { getAuthorizationStatus, getAuthCheckedStatus } from '../../store/user-process/selectors';
import { getStatus } from '../../store/app-data/selectors';
import { RequestStatus } from '../../const';
import PublicRoute from '../public-route/public-route';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);

  if (!isAuthChecked || isOffersDataLoading === RequestStatus.Loading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<MainPage />}
      />
      <Route
        path={AppRoute.Login}
        element={
          <PublicRoute
            authorizationStatus={authorizationStatus}
          >
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute
            authorizationStatus={authorizationStatus}
          >
            <FavoritesPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.OfferWithId}
        element={<OfferPage />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;
