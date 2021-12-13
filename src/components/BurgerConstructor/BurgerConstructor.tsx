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
        isLocked
        text={`${props.ingredients[0].name} (${position === 'top' ? 'верх' : 'низ'})`}
        price={props.ingredients[0].price}
        thumbnail={props.ingredients[0].image}
        key={`${position}${props.ingredients[0]._id}`}
      />
    )
  }

  const toggleModal = () => setshowModal(!showModal);
  
  return (
    <>
      {showModal ? (
        <Modal onClose={toggleModal}>
          <OrderDetails />
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
            <span className={`${s.price} text text_type_digits-medium`}>600 <CurrencyIcon type="primary" /></span>
            <Button type="primary" size="medium" onClick={toggleModal}>
              Оформить заказ
            </Button>
          </div>
      </>
      </section>
    </>
  )
}

export default BurgerConstructor; 