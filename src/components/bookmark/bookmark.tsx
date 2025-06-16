import { AppRoute, BookmarkClass } from '../../const';
import { Offer } from '../../types/offer';
import { useBoolean } from '../../hooks/boolean';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { favoritesActions } from '../../store/favorites/favorites';
import { useActionCreators } from '../../hooks/store';
import { useNavigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { toast } from 'react-toastify';

type BookmarkProps = {
  bookmarkClass: BookmarkClass;
  isFavorite: boolean;
  offerId: Offer['id'];
}

function Bookmark({ bookmarkClass, isFavorite, offerId }: BookmarkProps): JSX.Element {
  const { isOn: isBookmarked, toggle: toggleBookmark } = useBoolean(isFavorite);
  const isInOffer = bookmarkClass === BookmarkClass.Offer;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { postFavorite } = useActionCreators(favoritesActions);
  const navigate = useNavigate();
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  function handleClick() {
    if (!isAuth) {
      return navigate(AppRoute.Login);
    }

    postFavorite({ id: offerId, isFavorite: !isBookmarked })
      .unwrap()
      .catch(() => {
        toast.error('Failed. Please try again');
      });
    toggleBookmark();
  }

  return (
    <button
      className={`${bookmarkClass}__bookmark-button button ${isFavorite ? `${bookmarkClass}__bookmark-button--active` : ''}`}
      type="button"
      onClick={handleClick}
    >
      <svg className={`${bookmarkClass}__bookmark-icon`} width={isInOffer ? 31 : 18} height={isInOffer ? 33 : 19}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isBookmarked ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}

export default Bookmark;
