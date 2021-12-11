import { useState } from 'react';
import { ConstructorElement, DragIcon, Button, CurrencyIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
import s from './BurgerConstructor.module.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { IDataBurgers } from '../../utils/types';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../../components/Modal/Modal';

const BurgerConstructor = (props: IDataBurgers) => {
  const unLockData = props.burgers.filter((card : any) => card.type !== 'bun');
  const [showModal, setshowModal] = useState(false);

  const Elements = () => {
    return (
      <>
      <div className={`${s.content} mb-10`}>
        <ConstructorElement
              type="top"
              isLocked={true}
              text={`${props.burgers[0].name} (верх)`}
              price={props.burgers[0].price}
              thumbnail={props.burgers[0].image}
              key={`top${props.burgers[0]._id}`}
              />
        <Scrollbars 
          renderTrackVertical={({...props}) =>
              <div {...props} className={s.scrollTrackVertical}/>
            } 
          renderThumbVertical={({...props}) =>
              <div {...props} className={s.scrollThumbVertical}/>
            }
          className={`${s.contentInScroll}`}>
            {unLockData.map((card : any) => {
              return (
                <div key={card._id} className={`${card.type !== 'bun' ? s.unLock : ""}`}>
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
        <ConstructorElement  
              type="bottom"
              isLocked={true}
              text={`${props.burgers[0].name} (низ)`}
              price={props.burgers[0].price}
              thumbnail={props.burgers[0].image}
              key={`bottom${props.burgers[0]._id}`}
              />
      </div>  
      <div className={`${s.totalPrice} mb-10`}>
        <span className={`${s.price}`}>600 <CurrencyIcon type="primary" /></span>
        <Button type="primary" size="medium" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>
      </>
    )
  };

  const handleOpenModal = () => setshowModal(true);
  const handleCloseModal = () => setshowModal(false);

  const modal = showModal ? (
    <Modal onClose={handleCloseModal}>
       <OrderDetails />
   </Modal>
  ) : null;
  
  return (
    <>
      {modal}
      <section className={`${s.root} pt-25`}>
        {Elements()}
      </section>
    </>
  )
}

export default BurgerConstructor; 