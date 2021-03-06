import { useState, ChangeEvent } from 'react';
import { Input, Button }  from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useAppThunkDispatch } from '../utils/hooks';
import { sendNewPassword } from '../services/actions/User';

import s from './pages.module.css';

export function ResetPassword() {
  const [data, setData] = useState({ password: '', token: '' });

  const dispatch = useAppThunkDispatch();

  const handleSendData = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sendNewPassword(data));
  }
  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
  }

 return (
  <div className={s.wrapForm}>
     <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>
     <form className={`${s.form} mb-20`} onSubmit={handleSendData}>
      <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
          onChange={handleChangeData}
          icon={'ShowIcon'}
          value={data.password}
          name={'password'}
        />
      <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChangeData}
          value={data.token}
          name={'token'}
        />
        <Button type="primary" size="medium">
          Сохранить
        </Button>
     </form>
     <p className='text text_type_main-default'>
      <span className='text_color_inactive'>Вспомнили пароль?</span> 
      <Link to='/login'> Войти</Link>
     </p>
  </div>
)
}