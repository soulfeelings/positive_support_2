import { useRef } from 'react';
import ReactDOM from 'react-dom';

function PortalToBody({ children }) {
  const body = useRef(document.body).current;

  return ReactDOM.createPortal(children, body);
}

export default PortalToBody;
