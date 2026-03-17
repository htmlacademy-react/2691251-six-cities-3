import { Offers } from '../../types/offer';
import Card from '../card/card';

type OffersListProps = {
  offers: Offers;
  onHandleChangeActiveId: (id?: string) => void;
}

function OffersList({ offers, onHandleChangeActiveId }: OffersListProps): JSX.Element {
  return (
    <>
      {offers.map((offer, id) => {
        const keyValue = `${id}-${offer.id}`;
        return (
          <Card
            onHandleChangeActiveId={onHandleChangeActiveId}
            offer={offer}
            key={keyValue}
          />
        );
      })}
    </>);
}

export default OffersList;
