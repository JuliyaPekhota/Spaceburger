import { useState, useCallback } from 'react';
import { Button, CurrencyIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
import s from './BurgerConstructor.module.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { RootState, ItemTypes } from '../../utils/types';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../../components/Modal/Modal';
import { ADD_INGREDIENT_IN_ORDER, ADD_INGREDIENT_BUN_IN_ORDER, UPDATE_LOCATION_INGREDIENT_IN_ORDER } from '../../services/actions';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderNumber } from '../../services/actions/OrderDetails';
import { useDrop } from 'react-dnd';
import IngredientInOrder from '../IngredientInOrder/IngredientInOrder';
import { v4 as uuidv4 } from 'uuid';
import update from 'immutability-helper';

const BurgerConstructor = () => {
  const { ingredients, ingredientsDelayed } = useSelector((store: RootState) => store.ingredient);

  const [showModal, setshowModal] = useState(false);
  const { orderSuccess, number } = useSelector((store: RootState) => store.order);
  const sum  = ingredientsDelayed.reduce((sum: any, current: any) => current.type === 'bun' ? sum + current.price * 2 : sum + current.price, 0);
  const dispatch = useDispatch();
  
  const [cards, setCards] = useState(ingredientsDelayed ?? []);


  const ingredientIds = ingredientsDelayed.map(card => card?._id);

  const moveIngredient = useCallback((item: any) => {
    const ingredient = ingredients.filter((card: any) => card._id === item._id)[0];
    dispatch({
      type: ingredient.type === 'bun' ? ADD_INGREDIENT_BUN_IN_ORDER : ADD_INGREDIENT_IN_ORDER,
      ...item
    });
    setCards(ingredientsDelayed);
  },
  [ingredients, dispatch],
  );

  const [, drop] = useDrop({
    accept: ItemTypes.Ingredient,
    drop(itemId) {
        moveIngredient(itemId);
    },
  });

  const bunTopBottom = (position: string) => {
    return ingredientsDelayed
    .filter((card : any) => card.type === 'bun')
    .map((ingredient: any, i) => {
        return (
          <IngredientInOrder position={position} key={uuidv4()} cardData={[ingredient]}/>
        )
      })
  }

  const moveInOrder = useCallback((dragIndex: number, hoverIndex: number) => {
     /* dispatch({
        type: UPDATE_LOCATION_INGREDIENT_IN_ORDER,
        dragIndex,
        hoverIndex
      });*/
      const dragCard = cards[dragIndex]
        setCards(
          update(cards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          }),
        )
    },
    [dispatch],
  );

 const handleOpenModal = () => {
  setshowModal(true);
  dispatch(getOrderNumber(ingredientIds));
};

const handleCloseModal = () => setshowModal(false);
  
  return (
    <>
      {showModal ? (
        <Modal onClose={handleCloseModal}>
          {orderSuccess &&
            <OrderDetails number={number} />
          } 
        </Modal>
      ) : null
      }

      <section className={`${s.root} pt-25`}>
        <>
          <div ref={drop} className={`${s.content} mb-10`}>
            {ingredientsDelayed.length > 0 && bunTopBottom('top')}
            <Scrollbars 
              renderTrackVertical={({...props}) =>
                  <div {...props} className={s.scrollTrackVertical}/>
                } 
              renderThumbVertical={({...props}) =>
                  <div {...props} className={s.scrollThumbVertical}/>
                }
              className={`${s.contentInScroll}`}>
                {ingredientsDelayed
                .filter((card : any) => card.type !== 'bun')
                .map((ingredient: any, i) => {
                  return (
                    <IngredientInOrder key={uuidv4()} moveInOrder={moveInOrder} index={i} cardData={[ingredient]}/>         
                  )
                })}
            </Scrollbars>
            {ingredientsDelayed.length > 0 && bunTopBottom('bottom')}
          </div>  
          <div className={`${s.totalPrice} mb-10`}>
            {sum > 0 && 
            (<span className={`${s.price} text text_type_digits-medium`}>{sum} <CurrencyIcon type="primary" /></span>)
            }
            <Button type="primary" size="medium" onClick={handleOpenModal}>
              Оформить заказ
            </Button>
          </div>
      </>
      </section>
    </>
  )
}

export default BurgerConstructor; 