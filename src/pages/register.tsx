import { useState, ChangeEvent } from 'react';
import { Input, Button }  from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { registry } from '../services/actions/User';
import { useAppThunkDispatch, useAppSelector } from '../utils/hooks';

import s from './pages.module.css';

export function Register() {
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const success = useAppSelector(store => store.user.registerSuccess);
  const dispatch = useAppThunkDispatch();

  const handleSendData = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registry(data));
  }
  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
  }

 return (
  <div className={s.wrapForm}>
     <h2 className="text text_type_main-medium pb-6">Регистрация</h2>
     {success ? 
     "Успешно зарегистрирован"
     :
     (<>
        <form className={`${s.form} mb-20`} onSubmit={handleSendData}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={handleChangeData}
              value={data.name}
              name={'name'}
            />
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={handleChangeData}
              value={data.email}
              name={'email'}
            />
            <Input
              type={'password'}
              placeholder={'Пароль'}
              onChange={handleChangeData}
              icon={'ShowIcon'}
              value={data.password}
              name={'password'}
            />
            <Button type="primary" size="medium">
              Зарегистрироваться
            </Button>
        </form>
        <p className='text text_type_main-default'>
            <span className='text_color_inactive'>Уже зарегистрированы?</span> 
            <Link to='/login'> Войти</Link>
        </p>
     </>)
     }
  </div>
)
}