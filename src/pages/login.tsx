import { useState, ChangeEvent } from 'react';
import { Input, Button }  from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { loginUser } from '../services/actions/UserAuth';
import { useDispatch } from 'react-redux';
import { ILocationFrom } from '../utils/types';
import s from './pages.module.css';

export function LoginPage() {
  const [data, setData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { pathname } = useLocation<ILocationFrom>();
  const handleSendData = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(data));
  }
  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.currentTarget.name]: e.currentTarget.value.trim() });
  }

 return (
  <div className={s.wrapForm}>
     <h2 className="text text_type_main-medium pb-6">Вход</h2>
          <form className={`${s.form} mb-20`} onSubmit={handleSendData}>
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
              Войти
            </Button>
          </form>
          <p className='text text_type_main-default pb-4'>
            <span className='text_color_inactive'>Вы — новый пользователь?</span> 
            <Link 
              to={{ 
                pathname: '/register', 
                state: { from: pathname }
              }}
            > Зарегистрироваться</Link>
          </p>
          <p className='text text_type_main-default'>
            <span className='text_color_inactive'>Забыли пароль?</span>
            <Link 
              to={{ 
                pathname: '/forgot-password', 
                state: { from: pathname }
              }}
            > Восстановить пароль</Link>
          </p>
  </div>
)
}