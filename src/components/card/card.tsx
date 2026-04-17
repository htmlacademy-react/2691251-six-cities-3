import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { CardClass } from '../../const';
import Bookmark from '../bookmark/bookmark';
import { BookmarkClass } from '../../const';
import { capitalizeFirst } from '../../utils';

type CardProps = {
  offer: Offer;
  onHandleChangeActiveId?: (id?: string) => void;
  cardClass: CardClass;
}

const STARS_STYLE_COEFF = 20;

function Card({ offer, onHandleChangeActiveId, cardClass }: CardProps): JSX.Element {
  const isFavorite = cardClass === CardClass.Favorites;
  return (
    <article
      className={`${cardClass}__card place-card`}
      onMouseEnter={() => onHandleChangeActiveId && onHandleChangeActiveId(offer.id)}
      onMouseLeave={() => onHandleChangeActiveId && onHandleChangeActiveId()}
    >
      {offer.isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : ''}
      <div className={`${cardClass}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width={isFavorite ? '150' : '260'} height={isFavorite ? '110' : '200'} alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark isFavorite={offer.isFavorite} offerId={offer.id} bookmarkClass={BookmarkClass.PlaceCard} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(offer.rating) * STARS_STYLE_COEFF}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirst(offer.type)}</p>
      </div>
    </article>);
}

export default Card;
