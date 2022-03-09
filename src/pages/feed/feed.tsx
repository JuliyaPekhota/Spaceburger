import { useEffect } from 'react';
import { FeedItem } from '../../components/FeedItem';
import { useAppThunkDispatch, useAppSelector } from '../../utils/hooks';
import { wsInit, wsConnectionClosed } from '../../services/actions/actionsWs';
import { IWsMessageOrder, EWsStatus } from '../../utils/types';
import { getIngredients } from '../../services/actions';

import cn from "classnames";
import s from './feed.module.scss';

export const Feed = () => {
  const { ingredients } = useAppSelector(store => store.ingredient);
  const dispatch = useAppThunkDispatch();
  const messages = useAppSelector(store => store.ws.messages || []);
  const isConnect = useAppSelector(store => store.ws.wsConnected);
  let wsOrders: IWsMessageOrder[] = [];

  const wsOrdersTotal = messages[0]?.total ?? 0;
  const wsOrdersTotalToday = messages[0]?.totalToday ?? 0;

  useEffect(
    () => {
        dispatch(getIngredients());
        dispatch(wsInit());
        
        return () => {
            dispatch(wsConnectionClosed());
        };
    },
    [dispatch]
  );

  if (messages && messages.length > 0) {
    messages.forEach(({ orders }) => {
       wsOrders = orders.map(item => item)
    })
  }
  
 const getOrdersReady = () => {
    const ordersReady = wsOrders.filter(({ status }) => status === EWsStatus.Done);
    return (
      ordersReady.length > 0 ?
        ordersReady.map(({ number }, index) => 
          <span className={cn(s.colorBlue, "text text_type_digits-default pb-2")} key={`${number}_0${index}`}>{number}</span>
        )
        :
          null
    )
 }
const isOrdersReady = !!getOrdersReady(); 

const getOrdersInProgress = () => {
  const ordersReady = wsOrders.filter(({ status }) => status === EWsStatus.Pending);
  return (
      ordersReady.length > 0 ?
        ordersReady.map(({ number }, index) => 
            <span className="text text_type_digits-default pb-2" key={`${number}_0${index}`}>{number}</span>
        )
        :
        null
  )
}
const isOrdersInProgress = !!getOrdersInProgress();

 return (
  <section className={s.sectionFeed}>
    <h1 className='text text_type_main-large mb-5'>Лента заказов</h1>
        <div className={s.feedMain}>
          {isConnect ? (
            <>
              <div className={cn(s.feed, 'scroll')}>
                  {ingredients && ingredients.length > 0 &&
                      <FeedItem orders={wsOrders} ingredients={ingredients}/>
                  }
              </div>
              <div className={`${s.feedStatistics} ml-15`}>
                {isOrdersReady &&
                  <div className='mb-15 flexBox'>
                      <div className={s.box}>
                        <p className='text text_type_main-medium pb-6'>Готовы:</p>
                        <div className={s.numbersOrders}>
                          {getOrdersReady()}
                        </div>
                      </div>
                  </div>
                }  
                {isOrdersInProgress && 
                  <div className='mb-15 flexBox'>
                    <div className={s.box}>
                        <p className='text text_type_main-medium pb-6'>В работе:</p>
                        <div className={s.numbersOrders}>
                          {getOrdersInProgress()}
                        </div>
                      </div>
                  </div>    
                }
                <p className='text text_type_main-medium'>Выполнено за все время:</p>
                <p className={`${s.numberShadows} text text_type_digits-large pb-15`}>{wsOrdersTotal}</p>
                <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                <p className={`${s.numberShadows} text text_type_digits-large`}>{wsOrdersTotalToday}</p>
              </div>
            </>
          ) : (
            <p>Произошла ошибка при получении данных</p>
          )} 
        </div>
  </section>


)
}