import { useState, ChangeEvent } from 'react';
import { Input, Button }  from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { restoreEmail } from '../services/actions/User';
import { TAppState } from '../services/reducers';
import { useAppThunkDispatch, useAppSelector } from '../utils/hooks';

import s from './pages.module.css';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { resetPasswordSuccess } = useAppSelector((store: TAppState) => store.user);
  const dispatch = useAppThunkDispatch();

  const { pathname } = useLocation();

  const handleSendEmail = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(restoreEmail(email));
  }
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }

  if (resetPasswordSuccess) {
    return <Redirect
    to={{
      pathname: '/reset-password',
      state: { from: pathname }
    }}
  />
  }

 return (
  <div className={s.wrapForm}>
     <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>
      <form className={`${s.form} mb-20`} onSubmit={handleSendEmail}>
        <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={handleChangeEmail}
            value={email}
            name={'email'}
          />
          <Button type="primary" size="medium">
            Восстановить
          </Button>
      </form>
      <p className='text text_type_main-default'>
        <span className='text_color_inactive'>Вспомнили пароль?</span> 
        <Link to='/login'> Войти</Link>
      </p>
  </div>
)
}