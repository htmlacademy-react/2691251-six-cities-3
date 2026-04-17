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

const Size = {
  IN_WIDTH: 31,
  OUT_WIDTH: 18,
  IN_HEIGHT: 33,
  OUT_HEIGHT: 19
};

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
      <svg className={`${bookmarkClass}__bookmark-icon`} width={isInOffer ? Size.IN_WIDTH : Size.OUT_WIDTH} height={isInOffer ? Size.IN_HEIGHT : Size.OUT_HEIGHT}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isBookmarked ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}

export default Bookmark;
