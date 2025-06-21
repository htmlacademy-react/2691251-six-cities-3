import { Offers } from '../../types/offer';
import Card from '../card/card';
import { CardClass } from '../../const';

type NearOffersListProps = {
  offers: Offers;
}

function NearOffersList({ offers}: NearOffersListProps): JSX.Element {
  return (
    <>
      {offers.map((offer, id) => {
        const keyValue = `${id}-${offer.id}`;
        return (
          <Card
            offer={offer}
            key={keyValue}
            cardClass={CardClass.NearPlaces}
          />
        );
      })}
    </>);
}

export default NearOffersList;
