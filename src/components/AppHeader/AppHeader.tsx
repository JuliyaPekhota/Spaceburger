import { BurgerIcon, ListIcon, ProfileIcon, Logo }  from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, useLocation } from 'react-router-dom';
import cn from "classnames";
import s from './AppHeader.module.css';

const AppHeader = () => {    
  const { pathname } = useLocation();
    return (
        <header className={cn(s.header, 'm-10')}>
          <nav className={cn(s.navigation, 'mt-4 mb-4')}>
            <ul className={s.content}>
              <li className={s.links}>
                <NavLink to="/" className='pl-5 pr-5 mr-2' 
                isActive={() => pathname.includes('ingredients') || pathname === '/'}
                exact={true}
                >
                  <BurgerIcon type="secondary"/>
                  <span className="ml-2 text text_type_main-default">Конструктор</span>
                </NavLink>

                <NavLink to="/profile/orders" className='pl-5 pr-5'>
                  <ListIcon type="secondary" />
                  <span className="ml-2 text text_type_main-default">Лента заказов</span>
                </NavLink>
              </li>

              <li className={s.logo}>
                <Link to='/'><Logo /></Link>
              </li>

              <li className={s.login}>
                <NavLink to="/profile" exact={true} className='pl-5 pr-5'>
                  <ProfileIcon type="secondary" />
                  <span className="ml-2 text text_type_main-default">Личный кабинет</span>
                </NavLink> 
              </li>
            </ul>
          </nav>  
        </header>
      );
  }
  
  export default AppHeader;