import { MouseEvent } from 'react';
import { changeActiveCity } from '../../store/action';
import { useAppDispatch } from '../../hooks';
import { Link } from 'react-router-dom';
import { City } from '../../types/offer';
import { CITIES } from '../../mocks/cities';

type CitiesListProps = {
  citiesList: City[];
  selectedCity: City;
}

function CitiesList({ citiesList, selectedCity }: CitiesListProps): JSX.Element {

  const dispatch = useAppDispatch();

  const onCityClick = (evt: MouseEvent<HTMLSpanElement>) => {
    evt.preventDefault();
    if (evt.currentTarget.textContent) {
      const currentCity = CITIES.find((city) => city.name === evt.currentTarget.textContent);
      if (currentCity) {
        dispatch(changeActiveCity({ city: currentCity }));
      }
    }
  };

  return (
    <ul className="locations__list tabs__list">
      {citiesList.map((city, id) => {
        const keyValue = `${id}-${city.name}`;
        return (
          <li key={keyValue} className="locations__item">
            <Link to='#' onClick={onCityClick} className={`locations__item-link tabs__item ${city.name === selectedCity.name ? 'tabs__item--active' : ''}`}>
              <span>{city.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>);
}

export default CitiesList;
