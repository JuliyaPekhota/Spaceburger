import { useRef, useState } from 'react';
import { Counter, Tab, CurrencyIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
import s from './BurgerIngredients.module.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { IDataIngredients } from '../../utils/types';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../../components/Modal/Modal';

const BurgerIngredients = (props : IDataIngredients) => {
    const ingredients = props.ingredients;
    const sections = ['bun', 'sauce', 'main'];
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const scrollBar = useRef<Scrollbars>(null);

    const [current, setCurrent] = useState('bun');
    const [showModal, setshowModal] = useState(false);
    const [idCard, setIdCard] = useState('');

    const handleClickTab = (value : string) => {
        setCurrent(value);
        if (value === 'bun'){
            scrollBar.current?.scrollToTop();
        }
        if (value === 'sauce' && sauceRef && sauceRef.current){
            scrollBar.current?.scrollTop(sauceRef.current.offsetTop);
        }
        if (value === 'main' && mainRef && mainRef.current){
            scrollBar.current?.scrollTop(mainRef.current.offsetTop);
        }
     }

     const handleScroll = () => {
        const scroll = scrollBar?.current?.getScrollTop();
        const bottomPointOfScroll = scroll ? scroll + (231/2) : 0;
        const saucesMenuDot = (sauceRef && sauceRef.current) ? sauceRef.current.offsetTop  : 0;
        const mainMenuDot = (mainRef && mainRef.current) ? mainRef.current.offsetTop : 0;

        if (bottomPointOfScroll >= mainMenuDot) {
            setCurrent('main');
        } else if (bottomPointOfScroll >= saucesMenuDot) {
            setCurrent('sauce');
        } else {
            setCurrent('bun');
        }
     }

    const handleOpenModal = (id : string) => {
        setIdCard(id);
        setshowModal(true);
    }    
    const handleCloseModal = () => setshowModal(false);
    
    const currentCard = props.ingredients.filter(card => card._id === idCard);
    const modal = showModal ? (
        <Modal header="Детали ингредиента" onClose={handleCloseModal}>
           <IngredientDetails cardData={currentCard} />
        </Modal>
    ) : null;

    const tabs = () => {
        return (  
          <>
            {modal}
            <nav className={`${s.tabs} mb-10`}>
                {sections.map((tab, i) => (
                    <Tab key={`tab${i}${tab}`} value={tab} active={current === tab} onClick={handleClickTab}>
                        {tab === 'bun' ? 'Булки' : tab === 'sauce' ? 'Соусы' : 'Начинки'}
                    </Tab>
                    )
                )}
            </nav>

            <Scrollbars 
                renderTrackVertical={({...props}) => <div {...props} className={s.scrollTrackVertical}/>} 
                renderThumbVertical={({...props}) => <div {...props} className={s.scrollThumbVertical}/>}
                ref={scrollBar} 
                className={s.contentInScroll}
                onScroll={handleScroll}
            >
               {sections.map((tab, i) => (
                    <div key={`${i}${tab}`} ref={tab === 'bun' ? bunRef : tab === 'sauce' ? sauceRef : mainRef}>
                        <h2>{tab === 'bun' ? 'Булки' : tab === 'sauce' ? 'Соусы' : 'Начинки'}</h2>
                        <section className={`${s.ingredients} mt-6 mb-10 mr-4 ml-4`}>
                            {
                              ingredients
                              .filter(card => card.type === tab)
                              .map(card => {
                                return (
                                    <div onClick={() => handleOpenModal(card._id)} key={`_${card._id}`} className={`${s.card} pr-4 pl-4`}>
                                        <Counter count={1} size='default' />
                                        <img src={card.image} alt={card.name} />
                                        <span className={`${s.price} mt-1 mb-1 text text_type_main-default`}>{card.price} <CurrencyIcon type="primary" /></span>
                                        <span className={`${s.name} text text_type_main-default`}>{card.name}</span>
                                    </div>
                                )
                              })
                            }
                        </section>
                    </div>
               ))
               }
             </Scrollbars>
          </>
        )
    }
   
    return ( 
        <section className={`${s.root} mb-10`}>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
            {tabs()}
        </section>
    )
}
  
export default BurgerIngredients; 