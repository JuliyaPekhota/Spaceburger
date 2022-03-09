import { FC, MouseEvent } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { logoutUser } from '../../services/actions/actionsUser';
import { useAppDispatch } from '../../utils/hooks';

import s from './MenuProfile.module.css';

export const MenuProfile: FC = () => {
    const dispatch = useAppDispatch();
    const handleClickLogout = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(logoutUser());
    }

    return (
    <div className={s.sidebar}>
        <nav className='text text_type_main-medium mb-20'>
            <NavLink to="/profile/" exact={true} >Профиль</NavLink>
            <NavLink to="/profile/orders" exact={true} >История заказов</NavLink>
            <Link to="/" onClick={handleClickLogout}>
                Выход
            </Link>
        </nav>
        <p className='text text_type_main-default text_color_inactive'>В этом разделе вы можете<br />изменить свои персональные данные</p>
    </div>
    )
}