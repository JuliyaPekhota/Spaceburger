import { useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.getElementById("modal") || document.body;

const Modal = (props: any) => {
    const container = useMemo(() => document.createElement("div"), []);
    useEffect(() => {
      modalRoot.insertAdjacentElement('beforeend', container);
        return () => {
          modalRoot.removeChild(container);
        };
      }, [container]);
    
    return ReactDOM.createPortal(
      <div className={s.root}>
        <div className={s.modal}>
          {props.children}
        </div>
      </div>
      ,container);
} 
  
export default Modal;