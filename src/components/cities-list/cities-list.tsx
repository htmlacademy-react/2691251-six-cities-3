import { MouseEvent } from 'react';
import { changeActiveCity } from '../../store/action';
import { useAppDispatch } from '../../hooks';
import { Link } from 'react-router-dom';

type CitiesListProps = {
  citiesList: string[];
  selectedCity: string;
}

function CitiesList({ citiesList, selectedCity }: CitiesListProps): JSX.Element {

  const dispatch = useAppDispatch();

  const onCityClick = (evt: MouseEvent<HTMLSpanElement>) => {
    evt.preventDefault();
    if (evt.currentTarget.textContent) {
      dispatch(changeActiveCity({ city: evt.currentTarget.textContent }));
    }
  };

  return (
    <ul className="locations__list tabs__list">
      {citiesList.map((city, id) => {
        const keyValue = `${id}-${city}`;
        return (
          <li key={keyValue} className="locations__item">
            <Link to='#' onClick={onCityClick} className={`locations__item-link tabs__item ${city === selectedCity ? 'tabs__item--active' : ''}`}>
              <span>{city}</span>
            </Link>
          </li>
        );
      })}
    </ul>);
}

export default CitiesList;
