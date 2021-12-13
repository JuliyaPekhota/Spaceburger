import { ReactNode, useRef } from 'react';
import s from './ModalOverlay.module.css';

export interface IModalOverlay {
    onOverlayClick: (event?: React.MouseEvent) => void;
    children?: ReactNode;
}

const ModalOverlay = (props: IModalOverlay) => {
    const ref = useRef<HTMLDivElement>(null);

    const onOverlayClick = (e: React.MouseEvent | undefined) => {
        e?.stopPropagation();
        if (ref.current?.className === (e?.target as HTMLDivElement).className) {
            props.onOverlayClick();
        }
      }

    return(
        <div ref={ref} onClick={onOverlayClick} className={s.root}>{props.children}</div>
    );
} 

export default ModalOverlay;