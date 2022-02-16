import { FC, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Scrollbars } from 'react-custom-scrollbars';
import { IngredientInList } from '../IngredientInList';
import { useSelector } from 'react-redux';
import { IIngredient } from '../../utils/types';
import { TAppState } from '../../services/reducers';

import cn from "classnames";
import s from './BurgerIngredients.module.css';

const THUMB_HEIGHT = 230;

export const BurgerIngredients: FC = () => {
    const { ingredients } = useSelector((store: TAppState) => store.ingredient);

    const sections = ['bun', 'sauce', 'main'];
    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const scrollBar = useRef<Scrollbars>(null);

    const [current, setCurrent] = useState('bun');

    const handleClickTab = (value: string) => {
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
        const scroll = scrollBar?.current?.getScrollTop() || 0;
        const bottomPointOfScroll = scroll ? scroll + THUMB_HEIGHT : 0;
        const saucesPoint = sauceRef?.current?.offsetTop || 0;
        const mainPoint = mainRef?.current?.offsetTop || 0;
        
        if (bottomPointOfScroll >= mainPoint) {
            setCurrent('main');
        } else if (bottomPointOfScroll >= saucesPoint) {
            setCurrent('sauce');
        } else {
            setCurrent('bun');
        }
     }

    const tabs = () => {
        return (  
          <>
            <nav className={cn(s.tabs, 'mb-10')}>
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
                thumbSize={THUMB_HEIGHT}
                className={s.contentInScroll}
                onScroll={handleScroll}
                autoHeight={true}
                autoHeightMax={716}
            >
               {sections.map((tab, i) => (
                    <div key={`${i}${tab}`} ref={tab === 'bun' ? bunRef : tab === 'sauce' ? sauceRef : mainRef}>
                        <h2>{tab === 'bun' ? 'Булки' : tab === 'sauce' ? 'Соусы' : 'Начинки'}</h2>
                        <section className={`${s.ingredients} mt-6 mb-10 mr-4 ml-4`}>
                            {
                              ingredients
                              .filter(({ type }: IIngredient) => type === tab)
                              .map(({ _id }: IIngredient) => 
                                  <IngredientInList key={_id} _id={_id} />
                              )
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