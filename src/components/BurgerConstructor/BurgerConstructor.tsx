import { useState, useContext, useReducer, useEffect } from 'react';
import { ConstructorElement, DragIcon, Button, CurrencyIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
import s from './BurgerConstructor.module.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { IData, TypeElement } from '../../utils/types';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../../components/Modal/Modal';
import { IngredientsContext } from '../../services/ingredientsContext';
import { postData } from '../../services/postData';

const ORDERS_URL = 'https://norma.nomoreparties.space/api/orders';

const setTotalCost = (totalCost: any, action: any) => {
  switch (action.type) {
    case "added":
      return { sum: totalCost.sum };
    case "deleted":
      return { sum: 0 };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const BurgerConstructor = () => {
  const ingredients: Array<IData> = useContext(IngredientsContext);
  const bun = ingredients[0];
  const fillings = ingredients.filter((card : any) => card.type !== 'bun');
  const sumTotalOrder = fillings.reduce((sum, current) => sum + current.price, 0) + (bun.price*2);
  const [totalCost, dispatch] = useReducer(setTotalCost, {sum: sumTotalOrder});
  const [showModal, setshowModal] = useState(false);
  const [numberOrder, setNumberOrder] = useState(0);
  const [isNumberOrderLodaded, setIsNumberOrderLodaded] = useState(false);
  const idsOrder = ingredients.map(card => card._id);

  useEffect(() => {
    dispatch({ type: "added" })
  }, []);

  const bunTopBottom = (position: string) => {
    return (
      <div className={s.bunTopBottom}>
        <ConstructorElement
          type={position === 'top' ? TypeElement.Top : TypeElement.Bottom}
          isLocked
          text={`${bun.name} (${position === 'top' ? 'верх' : 'низ'})`}
          price={bun.price}
          thumbnail={bun.image}
          key={`${position}${bun._id}`}
        />
      </div>
    )
  }

 const handleOpenModal = () => {
  setshowModal(true);

  postData(ORDERS_URL, { "ingredients": idsOrder})
      .then(data => {
        setNumberOrder(data.order.number);
        setIsNumberOrderLodaded(data.success);
      })
      .catch(error => {
          console.error('There has been a problem with fetch operation:', error);
        }
      );
};

const handleCloseModal = () => setshowModal(false);
  
  return (
    <>
      {showModal ? (
        <Modal onClose={handleCloseModal}>
          {isNumberOrderLodaded &&
           <OrderDetails order={numberOrder}/>
          } 
        </Modal>
      ) : null
      }

      <section className={`${s.root} pt-25`}>
        <>
          <div className={`${s.content} mb-10`}>
            {bunTopBottom('top')}
            <Scrollbars 
              renderTrackVertical={({...props}) =>
                  <div {...props} className={s.scrollTrackVertical}/>
                } 
              renderThumbVertical={({...props}) =>
                  <div {...props} className={s.scrollThumbVertical}/>
                }
              className={`${s.contentInScroll}`}>
                {fillings.map((filling : any, i) => {
                  return (
                    <div key={`${filling._id}${i}`} className={`${s.fillings} mb-4 mr-4 ml-4`}>
                    {filling.type !== 'bun' && (<DragIcon type="primary" />)}
                    <ConstructorElement
                      isLocked={filling.type === 'bun'}
                      text={filling.name}
                      price={filling.price}
                      thumbnail={filling.image}
                    />
                    </div>                  
                  )
                })}
            </Scrollbars>
            {bunTopBottom('bottom')}
          </div>  
          <div className={`${s.totalPrice} mb-10`}>
            <span className={`${s.price} text text_type_digits-medium`}>{totalCost.sum} <CurrencyIcon type="primary" /></span>
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