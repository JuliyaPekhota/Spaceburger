import { FC, useState, useCallback, useMemo } from 'react';
import { Button, CurrencyIcon, BurgerIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from 'react-router-dom';
import { RootState, ItemTypes, IIngredient } from '../../utils/types';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../../components/Modal/Modal';
import { ADD_INGREDIENT_IN_ORDER, 
         ADD_INGREDIENT_BUN_IN_ORDER, 
         UPDATE_LOCATION_INGREDIENT_IN_ORDER } from '../../services/actions';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderNumber } from '../../services/actions/OrderDetails';
import { useDrop } from 'react-dnd';
import IngredientInOrder from '../IngredientInOrder/IngredientInOrder';
import { v4 as uuidv4 } from 'uuid';
import { Loader } from '../Loader/Loader';

import s from './BurgerConstructor.module.css';

const BurgerConstructor: FC = () => {
  const { 
    ingredients, 
    ingredientsInOrder
  } = useSelector((store: RootState) => store.ingredient);
  const { orderSuccess, orderRequest } = useSelector((store: RootState) => store.order);
  const isLoggedIn = useSelector((store: RootState) => store.user.authorized);
  const { accessToken } = useSelector((store: RootState) => store.user);
  const history = useHistory();

  const [showModal, setshowModal] = useState(false);
  const sum = useMemo(
    () => ingredientsInOrder.reduce((sum: any, current: any) => current.type === 'bun' ? sum + current.price * 2 : sum + current.price, 0),
    [ingredientsInOrder]
  );
  const dispatch = useDispatch();

  const ingredientIds = ingredientsInOrder.map(card => card?._id);
  
  const moveIngredient = useCallback((item: any) => {
    const ingredient = ingredients.filter((card: any) => card._id === item._id)[0];
    const idIngredient = uuidv4();
    dispatch({
      type: ingredient.type === 'bun' ? ADD_INGREDIENT_BUN_IN_ORDER : ADD_INGREDIENT_IN_ORDER,
      id: idIngredient,
      ...item
    });
  },
  [dispatch, ingredients],
  );

  const [, drop] = useDrop({
    accept: ItemTypes.Ingredient,
    drop(itemId) {
        moveIngredient(itemId);
    },
  });

  const moveInOrder = useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch({
      type: UPDATE_LOCATION_INGREDIENT_IN_ORDER,
      dragIndex,
      hoverIndex,
    });
    },
    [dispatch],
  );

 const handleOpenModal = () => {
  
  if (isLoggedIn) {
    setshowModal(true);
    dispatch(getOrderNumber(ingredientIds, accessToken));
  } else {
    history.push("/login");
  }
};

const handleCloseModal = () => setshowModal(false);

const bunTopBottom = (position: string) => {
  return ingredientsInOrder
  .filter((ingredient: IIngredient) => ingredient.type === 'bun')
  .map((ingredient: IIngredient, i) => 
     <IngredientInOrder position={position} key={uuidv4()} index={i} _id={ingredient._id}/>
  )
}

  return (
    <>
      {showModal ? (
        <Modal onClose={handleCloseModal}>
          {orderRequest && <Loader />}
          {orderSuccess && <OrderDetails />} 
        </Modal>
      ) : null
      }

      <section className={`${s.root} pt-25`}>
        <div ref={drop} className={`${s.content} mb-10`}>
          {ingredientsInOrder.length > 0 
          ?
          (<>
              {bunTopBottom('top')}
              <Scrollbars 
              renderTrackVertical={({...props}) =><div {...props} className={s.scrollTrackVertical}/>} 
              renderThumbVertical={({...props}) =><div {...props} className={s.scrollThumbVertical}/>}
              autoHeight={true}
              autoHeightMin={72}
              autoHeightMax={425}
              className={`${s.contentInScroll}`}>
                {ingredientsInOrder
                .map((ingredient: IIngredient, i:number) => ingredient.type !== 'bun' &&
                  <IngredientInOrder key={ingredient.id} moveInOrder={moveInOrder} index={i} _id={ingredient._id} />
                )}
              </Scrollbars>
              {bunTopBottom('bottom')}

              <div className={`${s.totalPrice} mb-10`}>
                {
                sum > 0 && <span className={`${s.price} text text_type_digits-medium`}>{sum} <CurrencyIcon type="primary" /></span>
                }
                <Button type="primary" size="medium" onClick={handleOpenModal}>
                  Оформить заказ
                </Button>
              </div>
          </>)
          :
              <div className={s.emptyCart}><BurgerIcon type="primary" /></div>
          }
        </div>
      </section>
    </>
  )
}
  
export default BurgerConstructor;