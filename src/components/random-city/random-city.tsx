import { CITIES } from '../../const';
import { Link } from 'react-router-dom';
import { changeActiveCity } from '../../store/app-process/app-process';
import { useAppDispatch } from '../../hooks';
import { getRandomInteger } from '../../utils';
import { AppRoute } from '../../const';

function RandomCity(): JSX.Element {
  const dispatch = useAppDispatch();
  const randomCityIndex = getRandomInteger(0, CITIES.length - 1);
  const randomCity = CITIES[randomCityIndex];

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link
          className="locations__item-link"
          to={AppRoute.Main}
          onClick={() => dispatch(changeActiveCity({city: randomCity}))}
        >
          <span>{randomCity.name}</span>
        </Link>
      </div>
    </section>
  );
}

export default RandomCity;
