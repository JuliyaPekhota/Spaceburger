import { useMemo, useEffect, useCallback, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay } from '../ModalOverlay';
import { CloseIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
import s from './Modal.module.css';

const modalRoot = document.getElementById("modals") || document.body;

export interface IModal {
  header?: string;
  onClose: (event?: React.MouseEvent) => void;
  children?: ReactNode;
}

export const Modal = (props: IModal) => {
    const container = useMemo(() => document.createElement("div"), []);

    useEffect(() => {
      modalRoot.insertAdjacentElement('beforeend', container);
        return () => {
          modalRoot.removeChild(container);
        };
      }, [container]);
    
    const pressEsc = useCallback((e: KeyboardEvent) => {
        if(e.key === "Escape") {
          props?.onClose();
        }
      }, [props]
    )

    useEffect(() => {
      document.addEventListener("keydown", pressEsc);
    
        return () => {
          document.removeEventListener("keydown", pressEsc);
        };
    }, [pressEsc]);

    return ReactDOM.createPortal(
      <>
        <ModalOverlay onOverlayClick={props.onClose}>
          <div className={`${s.modal} pt-10 pl-10 pb-15 pr-10`}>
            <div id="closeBtn" className={`${s.close} pt-15 pr-10`} onClick={props.onClose}>
              <CloseIcon type="primary" />
            </div>
            <h1 className={`${s.head} text text_type_main-large`}>{props.header}</h1>
            {props.children}
          </div>
        </ModalOverlay>
      </>
      , container);
}