import { FC, useState, useCallback, useMemo } from 'react';
import { Button, CurrencyIcon, BurgerIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from 'react-router-dom';
import { ItemTypes, IIngredient, IDragItem } from '../../utils/types';
import { OrderDetails } from '../OrderDetails';
import { Modal } from '../../components/Modal';
import { ADD_INGREDIENT_IN_ORDER,
         ADD_INGREDIENT_BUN_IN_ORDER } from '../../services/actions';
import { actionUpdatedIngredient, gettingIngredientBun } from '../../services/actions/actionsIngredient';
import { getOrder } from '../../services/actions/actionsOrderDetails';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useDrop } from 'react-dnd';
import { IngredientInOrder } from '../IngredientInOrder';
import { v4 as uuidv4 } from 'uuid';
import { Loader } from '../Loader';

import s from './BurgerConstructor.module.css';

export const BurgerConstructor: FC = () => {
  const { 
    ingredients, 
    ingredientsInOrder
  } = useAppSelector(store => store.ingredient);
  const { orderSuccess, orderRequest } = useAppSelector(store => store.order);
  const isLoggedIn = useAppSelector(store => store.user.authorized);
  const history = useHistory();

  const [showModal, setshowModal] = useState(false);
  const sum = useMemo(
    () => (ingredientsInOrder as IIngredient[]).reduce((sum, { type, price }) => type === 'bun' ? sum + price * 2 : sum + price, 0),
    [ingredientsInOrder]
  );
  const dispatch = useAppDispatch();

  const isBunInOrder = useMemo(
    () => ingredientsInOrder.some(({ type }) => type === 'bun'),
    [ingredientsInOrder]
  );

  const ingredientIds = ingredientsInOrder.map(card => card?._id);

  const moveIngredient = useCallback((item: IDragItem) => {
    const ingredient = ingredients.filter((card: IIngredient) => card._id === item._id)[0];
    const idIngredient = uuidv4();
    dispatch(gettingIngredientBun(ingredient.type === 'bun' ? ADD_INGREDIENT_BUN_IN_ORDER : ADD_INGREDIENT_IN_ORDER, idIngredient, item._id));
  },
  [dispatch, ingredients],
  );

  const [, drop] = useDrop({
    accept: ItemTypes.Ingredient,
    drop(itemId: IDragItem) {
      moveIngredient(itemId);
    },
  });

  const moveInOrder = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch(actionUpdatedIngredient(dragIndex, hoverIndex));
    }, [dispatch],
  );

 const handleOpenModal = () => {
  if (isLoggedIn) {
    setshowModal(true);
    dispatch(getOrder(ingredientIds));
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
                <Button 
                  type="primary" 
                  size="medium" 
                  onClick={handleOpenModal}
                  disabled={!isBunInOrder}
                >
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
  
//export default BurgerConstructor;