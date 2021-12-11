import { ReactNode } from 'react';
import s from './ModalOverlay.module.css';

export interface IModalOverlay {
    onClose: (event?: React.MouseEvent) => void;
    children?: ReactNode;
}

const ModalOverlay = (props: IModalOverlay) => <div onClick={props.onClose} className={s.root}>{props.children}</div>;

export default ModalOverlay;