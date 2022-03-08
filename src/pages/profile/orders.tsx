import { useEffect } from 'react';
import { MenuProfile } from "../../components/MenuProfile";
import { FeedItem } from '../../components/FeedItem';
import { useAppThunkDispatch, useAppSelector } from '../../utils/hooks';
import { IWsMessageOrder } from '../../utils/types';
import { wsConnectionClosed } from '../../services/actions/actionsWs';
import { getIngredients } from '../../services/actions';
import { initOrders } from '../../services/actions/actionsUser';

import cn from "classnames";
import s from './profile.module.css';

export const ProfileOrders = () => {
  const { ingredients } = useAppSelector(store => store.ingredient);
  const dispatch = useAppThunkDispatch();
  const messages = useAppSelector(store => store.ws.messages || []);
  let wsOrders: IWsMessageOrder[] = [];

  useEffect(
    () => {
      dispatch(initOrders());
      dispatch(getIngredients());
      
      return () => {
          dispatch(wsConnectionClosed());
      };
    },
    [dispatch]
  );

  if (messages && messages.length > 0) {
      wsOrders = messages[0].orders.map(item => item)
  }

 return (
  <div className={`${s.orders} pl-5 pr-5`}>
      <MenuProfile />
      <div className={cn(s.listOrders, 'scroll')}>
          {ingredients && ingredients.length > 0 &&
              <FeedItem 
                isOrder
                orders={wsOrders} 
                ingredients={ingredients}
              />
          }
      </div>
  </div>
)}