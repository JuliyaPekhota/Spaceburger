import { FC } from 'react';
import imageLoad from '../../images/load.svg';

import s from './Loader.module.css';

export const Loader: FC = () => {
    return (
        <div className={s.wrap}>
            Загрузка <img className={s.image} src={imageLoad} alt='loading'/>
        </div>
    )
}