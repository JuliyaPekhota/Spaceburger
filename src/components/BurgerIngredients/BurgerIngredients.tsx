import { useRef, useState } from 'react';
import { Counter, Tab, CurrencyIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
import s from './BurgerIngredients.module.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { IDataBurgers } from '../../utils/types';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../../components/Modal/Modal';

const BurgerIngredients = (props : IDataBurgers) => {
    const buns = props.burgers.filter(card => card.type === 'bun');
    const sauces = props.burgers.filter(card => card.type === 'sauce');
    const mains = props.burgers.filter(card => card.type === 'main');
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
        const scrollBottom = scroll ? scroll + (231/2) : 0;
        const pointSauce = (sauceRef && sauceRef.current) ? sauceRef.current.offsetTop  : 0;
        const pointMain = (mainRef && mainRef.current) ? mainRef.current.offsetTop : 0;

        if (scrollBottom >= pointMain) {
            setCurrent('main');
        } else if (scrollBottom >= pointSauce) {
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
    
    const currentCard = props.burgers.filter(card => card._id === idCard);
    const modal = showModal ? (
        <Modal header="Детали ингредиента" onClose={handleCloseModal}>
           <IngredientDetails cardData={currentCard} />
        </Modal>
    ) : null;

    const Tabs = () => {
        return (  
          <>
            {modal}
            <nav className={`${s.tabs} mb-10`}>
                <Tab value='bun' active={current === 'bun'} onClick={handleClickTab}>
                   Булки
                </Tab>
                <Tab value='sauce' active={current === 'sauce'} onClick={handleClickTab}>
                    Соусы
                </Tab>
                <Tab value='main' active={current === 'main'} onClick={handleClickTab}>
                    Начинки
                </Tab>
            </nav>

            <Scrollbars 
                renderTrackVertical={({...props}) => <div {...props} className={s.scrollTrackVertical}/>} 
                renderThumbVertical={({...props}) => <div {...props} className={s.scrollThumbVertical}/>}
                ref={scrollBar} 
                className={s.contentInScroll}
                onScroll={handleScroll}
            >
                <div ref={bunRef}>
                    <h2>Булки</h2>
                    <section className={`${s.ingredients} mt-6 mb-10 mr-4 ml-4`}>
                        {buns.map(card => {
                            return (
                                <div onClick={() => handleOpenModal(card._id)} key={`_${card._id}`} className={`${s.card} pr-4 pl-4`}>
                                    <Counter count={1} size='default' />
                                    <img src={card.image} alt='bun' />
                                    <span className={`${s.price} mt-1 mb-1 text text_type_main-default`}>{card.price} <CurrencyIcon type="primary" /></span>
                                    <span className={`${s.name} text text_type_main-default`}>{card.name}</span>
                                </div>
                            )
                        })}
                    </section>
                </div>

                <div ref={sauceRef}>
                <h2>Соусы</h2>
                <section className={`${s.ingredients} mt-6 mb-10 mr-4 ml-4`}>
                            {sauces.map(card => {
                                return (
                                    <div onClick={() => handleOpenModal(card._id)} key={`_${card._id}`} className={`${s.card} pr-4 pl-4`}>
                                        <Counter count={1} size='default' />
                                        <img src={card.image} alt='sauce' />
                                        <span className={`${s.price} mt-1 mb-1 text text_type_main-default`}>{card.price} <CurrencyIcon type="primary" /></span>
                                        <span className={`${s.name} text text_type_main-default`}>{card.name}</span>
                                    </div>
                                )
                            })}
                </section>
                </div>

                <div ref={mainRef}>
                <h2>Начинки</h2>
                <section className={`${s.ingredients} mt-6 mb-10 mr-4 ml-4`}>
                    {mains.map(card => {
                        return (
                            <div onClick={() => handleOpenModal(card._id)} key={`_${card._id}`} className={`${s.card} pr-4 pl-4`}>
                                <Counter count={1} size='default' />
                                <img src={card.image} alt='main' />
                                <span className={`${s.price} mt-1 mb-1 text text_type_main-default`}>{card.price} <CurrencyIcon type="primary" /></span>
                                <span className={`${s.name} text text_type_main-default`}>{card.name}</span>
                            </div>
                        )
                    })}
                </section>
                </div>
             </Scrollbars>
          </>
        )
    }
   
    return ( 
        <section className={`${s.root} mb-10`}>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
            {Tabs()}
        </section>
    )
}
  
export default BurgerIngredients; 