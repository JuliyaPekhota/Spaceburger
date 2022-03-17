import { FC } from 'react';
import { LoadSvg } from '../../images/load';

import s from './Loader.module.css';

export const Loader: FC = () => {
    return (
        <div className={s.wrap}>
            Загрузка <LoadSvg />
        </div>
    )
}