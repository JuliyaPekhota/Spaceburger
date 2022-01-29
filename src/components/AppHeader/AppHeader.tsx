import { BurgerIcon, ListIcon, ProfileIcon, Logo }  from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import cn from "classnames";
import s from './AppHeader.module.css';

const AppHeader = () => {    
      return (
        <header className={cn(s.header, 'm-10')}>
          <nav className={cn(s.navigation, 'mt-4 mb-4')}>
            <ul className={s.content}>
              <li className={s.links}>
                <Link to="/" className={cn(s.burgerLink, 'pl-5 pr-5 mr-2')}>
                  <BurgerIcon type="primary"/>
                  <span className="ml-2 text text_type_main-default">Конструктор</span>
                </Link>

                <Link to="/" className={cn(s.listLink, 'pl-5 pr-5')}>
                  <ListIcon type="secondary" />
                  <span className="ml-2 text text_type_main-default">Лента заказов</span>
                </Link>
              </li>

              <li className={s.logo}>
                <Link to='/'><Logo /></Link>
              </li>

              <li className={s.login}>
                <Link to="/profile" className={cn(s.loginLink, 'pl-5 pr-5')}>
                  <ProfileIcon type="secondary" />
                  <span className="ml-2 text text_type_main-default">Личный кабинет</span>
                </Link> 
              </li>
            </ul>
          </nav>  
        </header>
      );
  }
  
  export default AppHeader;