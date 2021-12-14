import {BurgerIcon, ListIcon, ProfileIcon, Logo}  from '@ya.praktikum/react-developer-burger-ui-components';
import s from './AppHeader.module.css';

const AppHeader = () => {
    
      return (
        <header className={`${s.header} m-10`}>
          <nav className={`${s.navigation} mt-4 mb-4`}>
            <ul className={s.content}>
              <li className={s.links}>
                <a href="/" className={`${s.burgerLink} pl-5 pr-5 mr-2`}>
                  <BurgerIcon type="primary"/>
                  <span className="ml-2 text text_type_main-default">Конструктор</span>
                </a>

                <a href="/" className={`${s.listLink} pl-5 pr-5`}>
                  <ListIcon type="secondary" />
                  <span className="ml-2 text text_type_main-default">Лента заказов</span>
                </a>
              </li>

              <li className={s.logo}>
                <a href="/"><Logo /></a>
              </li>

              <li className={s.login}>
                <a href="/" className={`${s.loginLink} pl-5 pr-5`}>
                  <ProfileIcon type="secondary" />
                  <span className="ml-2 text text_type_main-default">Личный кабинет</span>
                </a>  
              </li>
            </ul>
          </nav>  
        </header>
      );
    
  }
  
  export default AppHeader;