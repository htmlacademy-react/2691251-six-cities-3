import {useAppSelector} from '../../hooks';
import './error-message.css';
import { getErrorStatus } from '../../store/app-process/selectors';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getErrorStatus);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}

export default ErrorMessage;
