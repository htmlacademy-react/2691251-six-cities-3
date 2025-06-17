
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getUserData } from '../../store/user-process/selectors';
import { RequestStatus } from '../../const';
import { useEffect } from 'react';
import { getFavoritesStatus, getFavorites } from '../../store/favorites/selectors';
import { useActionCreators } from '../../hooks/store';
import { favoritesActions } from '../../store/favorites/favorites';

function Header(): JSX.Element {
  const authenticationStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getUserData);
  const { fetchFavorites } = useActionCreators(favoritesActions);
  const status = useAppSelector(getFavoritesStatus);
  const favorites = useAppSelector(getFavorites);
  const countFavorites = favorites.length;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === RequestStatus.Idle) {
      fetchFavorites();
    }
  }, [status, fetchFavorites]);

  return (
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            {authenticationStatus !== AuthorizationStatus.Auth ?
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__login">Sign in</span>
                </Link>
              </li>
              :
              <>
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{userData?.email}</span>
                    <span className="header__favorite-count">{countFavorites}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link"
                    onClick={(evt) => {
                      evt.preventDefault();
                      dispatch(logoutAction());
                    }}
                    to='/'
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </>}
          </ul>
        </nav>
      </div>
    </div>);
}

export default Header;
