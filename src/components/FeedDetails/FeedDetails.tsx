import { FC, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { CurrencyIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector, useAppThunkDispatch } from '../../utils/hooks';
import { IWsMessageOrder, IIngredient } from '../../utils/types';
import { wsInit, wsConnectionClosed } from '../../services/actions/actionsWs';
import { getIngredients } from '../../services/actions';
import { returnStatus, getDate, getOrderCost, getSelectIngredients } from '../../utils/utils';
import { initOrders } from '../../services/actions/actionsUser';

import cn from "classnames";
import s from './FeedDetails.module.css';

interface IFeedDetailsProps {
    type?: string;
    variant?: string;
}

export const FeedDetails: FC<IFeedDetailsProps> = ({ type, variant }) => {
    const ingredients = useAppSelector(store => store.ingredient.ingredients);
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppThunkDispatch();
    const messages = useAppSelector(store => store.ws.messages || []);
    
    const isPage = type === "page";
    let orderDetail: IWsMessageOrder[] = [];
    let selectIngredient: IIngredient[] = [];
    
    messages.forEach(({ orders }) => {
        orderDetail = orders.filter(item => item.number === parseInt(id, 10))
    });

    useEffect(
        () => {
         if (isPage) {
           dispatch(getIngredients());
           if (variant === "orders") {
                dispatch(initOrders());
           } else {
                dispatch(wsInit());
           }    
         }

         return () => {
            if (isPage) {
              dispatch(wsConnectionClosed());
            }
          };
        },
     [isPage, dispatch, variant]
    );

    if (orderDetail && orderDetail.length > 0 && ingredients && ingredients.length > 0) {
        selectIngredient = getSelectIngredients(ingredients, orderDetail[0].ingredients);
    }

    const quantityInOrder = (id: string, ids: string[]): number => {
       return ids.filter(item => item === id).length
    }

    return (
        <>
            {orderDetail && orderDetail.length > 0 && ingredients && ingredients.length > 0 && (
                <div className={s.feedDetails} key={id}>
                    <p className='text text_type_digits-default text_center mb-10'>#{id}</p>
                    <p className='text text_type_main-medium mb-3'>{orderDetail[0].name}</p>

                    <span className={`${s.status} text text_type_main-default`}>{returnStatus(orderDetail[0].status)}</span>
                    <p className='text text_type_main-medium mt-15 mb-6'>Состав:</p>
                    <div className={cn(s.feedIngredients, 'scroll', 'mb-10')}>
                        {selectIngredient.map(({ name, image, _id, price }) => 
                        <div className={s.feedIngredient} key={_id}>
                            <div className={cn(s.iconWrap, 'mr-4')}>
                                <div className={s.iconBlackWrap}>
                                    <img className={s.icon} alt={name} src={image} />
                                </div>    
                            </div>    
                            <div className={cn(s.nameIngredient, 'text text_type_main-default mr-4')}>{name}</div>
                            <p className='text text_type_digits-default'>{quantityInOrder(_id, orderDetail[0].ingredients)} x {price}&nbsp;</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        )}
                    </div>
                    <div className='flexBox'>
                        <p className={cn(s.date,'text text_type_main-default text_color_inactive')}>{getDate(orderDetail[0].createdAt)}</p>
                        <p className='text text_type_digits-default'>{getOrderCost(ingredients, orderDetail[0].ingredients)}&nbsp;</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
    )}
    </>
    )
}