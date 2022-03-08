import { useState, ChangeEvent, useEffect } from 'react';
import { Input, Button }  from '@ya.praktikum/react-developer-burger-ui-components';
import { getInfoUser, patchInfoUser } from '../../services/actions/actionsUser';
import { IRegistryUser } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import s from './profile.module.css';
import { MenuProfile } from '../../components/MenuProfile';

export function Profile() {
  const success = useAppSelector(store=> store.user.getUserInfoSuccess);
  const user = useAppSelector(store => store.user.user) as IRegistryUser;

  const [data, setData] = useState<IRegistryUser>({ email: '', name: '', password: '' });
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getInfoUser());
  }, [dispatch]);
  
  useEffect(() => {
    if (success) {
        setData(state => ({ ...state, email: user.email, name: user.name }));
    }
  }, [success, user.email, user.name]);

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

 return (
    <div className={`${s.profile} pl-5 pr-5`}>
        <MenuProfile />
        <div className={s.wrapEditForm}>
            <form className={`${s.form} mb-20`} onSubmit={handleSendData}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={handleChange}
                        value={data.name ?? ""}
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
)}