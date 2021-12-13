import { useState } from 'react';
import { ConstructorElement, DragIcon, Button, CurrencyIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
import s from './BurgerConstructor.module.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { IDataIngredients } from '../../utils/types';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../../components/Modal/Modal';

enum TypeElement {
  Top = "top",
  Bottom = "bottom"
}

const BurgerConstructor = (props: IDataIngredients) => {
  const fillings = props.ingredients.filter((card : any) => card.type !== 'bun');
  const [showModal, setshowModal] = useState(false);

  const bunTopBottom = (position: string) => {
    return (
      <ConstructorElement
        type={position === 'top' ? TypeElement.Top : TypeElement.Bottom}
        isLocked={true}
        text={`${props.ingredients[0].name} (${position === 'top' ? 'верх' : 'низ'})`}
        price={props.ingredients[0].price}
        thumbnail={props.ingredients[0].image}
        key={`${position}${props.ingredients[0]._id}`}
      />
    )
  }

  const constructorElements = () => {
    return (
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
            {fillings.map((card : any) => {
              return (
                <div key={card._id} className={`${s.fillings} mb-4 mr-4 ml-4`}>
                {card.type !== 'bun' && (<DragIcon type="primary" />)}
                <ConstructorElement
                  isLocked={card.type === 'bun'}
                  text={card.name}
                  price={card.price}
                  thumbnail={card.image}
                />
                </div>                  
              )
            })}
        </Scrollbars>
        {bunTopBottom('bottom')}
      </div>  
      <div className={`${s.totalPrice} mb-10`}>
        <span className={`${s.price} text text_type_digits-medium`}>600 <CurrencyIcon type="primary" /></span>
        <Button type="primary" size="medium" onClick={toggleModal}>
          Оформить заказ
        </Button>
      </div>
      </>
    )
  };

  const toggleModal = () => setshowModal(!showModal);

  const modal = showModal ? (
    <Modal onClose={toggleModal}>
       <OrderDetails />
    </Modal>
  ) : null;
  
  return (
    <>
      {modal}
      <section className={`${s.root} pt-25`}>
        {constructorElements()}
      </section>
    </>
  )
}

export default BurgerConstructor; 