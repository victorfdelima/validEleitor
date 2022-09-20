import ReactDOM from 'react-dom';
import { Spinner } from '../Spinner';
import { Overlay } from './styles';

export function Loader() {
  return ReactDOM.createPortal(
    <Overlay>
      <Spinner />
    </Overlay>,
    document.getElementById('loading-portal')!,
  );
}
