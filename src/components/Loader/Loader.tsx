import { FC } from 'react';
import ImageLoad from '../../images/load.svg';

import s from './Loader.module.css';

export const Loader: FC = () => {
    return (
        <div className={s.wrap}>
            Загрузка <ImageLoad />
        </div>
    )
}