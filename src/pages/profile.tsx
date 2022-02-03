import { useState, ChangeEvent, useEffect, MouseEvent } from 'react';
import { Input, Button }  from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Link } from 'react-router-dom';
import { getInfoUser, patchInfoUser, logoutUser } from '../services/actions/UserAuth';
import { RootState } from '../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import s from './pages.module.css';

export function Profile() {
  const { getUserInfoSuccess } = useSelector((store: RootState) => store.user);
  const { user }: any = useSelector((store: RootState) => store.user);
  const [data, setData] = useState({ email: '', name: '', password: '' });
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfoUser());
  }, [dispatch]);
  
  useEffect(() => {
    if (getUserInfoSuccess) {
        setData(state => ({ ...state, email: user.email, name: user.name }));
    }
  }, [getUserInfoSuccess, user.email, user.name]);

  const handleSendData = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
    dispatch(patchInfoUser(data));
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsEditing(true);
    setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
  }
  const handleDiscardСhanges = () => {
    setData({...data, email: user.email, name: user.name });
    setIsEditing(false);
  }
  const handleClickLogout = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(logoutUser());
  }

 return (
    <> 
        <div className={`${s.profile} pl-5 pr-5`}>
            <div className='sidebar'>
                <nav className='text text_type_main-medium mb-20'>
                    <NavLink to="/profile">Профиль</NavLink>
                    <NavLink to="/profile/orders">История заказов</NavLink>
                    <Link to="/" onClick={handleClickLogout}>
                        Выход
                    </Link>
                </nav>
                <p className='text text_type_main-default text_color_inactive'>В этом разделе вы можете<br />изменить свои персональные данные</p>
            </div>

            <div className={s.wrapEditForm}>
                <form className={`${s.form} mb-20`} onSubmit={handleSendData}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={handleChange}
                        value={data.name}
                        name={'name'}
                        icon={'EditIcon'}
                    />
                    <Input
                        type={'email'}
                        placeholder={'Логин'}
                        onChange={handleChange}
                        value={data.email}
                        name={'email'}
                        icon={'EditIcon'}
                    />
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        onChange={handleChange}
                        value={data.password}
                        name={'password'}
                        icon={'EditIcon'}
                    />
                    {isEditing && 
                        <div className={s.buttons}>
                            <div className={s.profileButton}>
                                <button 
                                    className={s.buttonPrimary}
                                    type="button" 
                                    onClick={handleDiscardСhanges}>
                                    Отмена
                                </button> 
                            </div>
                            <div className={s.profileButton}>
                                <Button type="primary" size="medium">
                                    Сохранить
                                </Button>
                            </div>
                        </div> 
                    }
                </form>
            </div>
        </div>
    </>    
)
}