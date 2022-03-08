import { FC } from 'react';
import { IWsMessageOrder, IIngredient, EWsStatus } from '../../utils/types';
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
import { getDate, sortByDate, getOrderCost, getSelectIngredients, returnStatus } from '../../utils/utils';

import s from './FeedItem.module.css';
import cn from "classnames";

interface IFeedItemProps {
    isOrder?: boolean;
    orders: IWsMessageOrder[];
    ingredients: IIngredient[]
}

export const FeedItem: FC<IFeedItemProps> = ({ ingredients: allIngredients, orders, isOrder = false }) => {
  const location = useLocation();
  const getIngredientPicture = (ingredients: IIngredient[], ids: string[]) => {
  const selectIngredients: IIngredient[] = getSelectIngredients(ingredients, ids);
 
    return selectIngredients.map((ingredient, index) => (
            <div key={ingredient._id} className={cn(s.iconWrap, countIngredientPicture(ids) > 6 && index === 5 && s.iconBlackout)}>
                {countIngredientPicture(ids) > 6 && index === 5 && 
                  <div className={s.numberOfHiddenPictures}>+{countIngredientPicture(ids) - 6}</div>
                }
                <div className={s.iconBlackWrap}>
                    <img className={s.icon} src={ingredient.image} alt={ingredient.name} />
                </div>
            </div>
        )
    )              
  }

  const countIngredientPicture = (ingredients: string[]) => {
    return ingredients
              .filter((item, index) => ingredients.indexOf(item) === index)
              .length
  }
  
    return (
       <>  
      {orders && orders.length > 0 && allIngredients && allIngredients.length > 0 && 
            orders
            .sort(sortByDate)
            .map(({ number, name, status, createdAt, ingredients }, index) => (
            <div className={s.itemFeed} key={`${index}${number}`}> 
              <Link to={{
                        pathname: isOrder ? `/profile/orders/${number}` : `/feed/${number}`,
                        state: isOrder ? { order: location } : { feed: location }
                    }}>
                <div className={s.itemTop}>
                  <span className='text text_type_digits-default'>#{number}</span>
                  <span className='text text_type_main-default text_color_inactive'>{getDate(createdAt)}</span>
                </div>

                <div>
                  <h2 className='text text_type_main-medium'>{name}</h2>
                </div>
                
                {isOrder && 
                  <p className={cn(status === EWsStatus.Done && s.colorBlue, status === EWsStatus.Cancel && s.colorRed, `text text_type_main-default mt-2`)}>{returnStatus(status)}</p>
                }

                <div className={s.itemBottom}>
                  <div className={s.icons}>
                    {getIngredientPicture(allIngredients, ingredients)}
                  </div>  
                  <span className={`${s.itemPrice} text text_type_digits-default`}>
                    {getOrderCost(allIngredients, ingredients)}&nbsp;
                    <CurrencyIcon type="primary" /></span>
                </div>
              </Link>
            </div>  
            ))
          }
        </>  
    )     
}