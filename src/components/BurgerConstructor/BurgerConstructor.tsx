import { ConstructorElement, DragIcon, Button, CurrencyIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
import s from './BurgerConstructor.module.css';
import { Scrollbars } from 'react-custom-scrollbars';
import  data  from "../../utils/data.js";
import PropTypes from 'prop-types';

const BurgerConstructor = () => {
  const unLockData = data.filter(card => card.type !== 'bun');
  const Elements = () => {
    return (
      <>
      
      <div className={`${s.content} mb-10`}>
        <ConstructorElement
              type="top"
              isLocked={true}
              text={data[0].name}
              price={data[0].price}
              thumbnail={data[0].image}
              key={data[0]._id}
              />
        <Scrollbars 
          renderTrackVertical={({style, ...props}) =>
              <div {...props} className={s.scrollTrackVertical} style={{...style, right: '2px', bottom: '2px', top: '2px', backgroundColor: '#2F2F37', borderRadius: '0', width: '8px'}}/>
            } 
          renderThumbVertical={({style, ...props}) =>
              <div {...props} className={s.scrollThumbVertical} style={{...style, borderRadius: '0', backgroundColor: '#8585AD'}}/>
            }  
          style={{height: 464}} 
          className={`${s.contentInScroll}`}>
            {unLockData.map((card, i) => {
              return (
                <div key={card._id} className={`${card.type !== 'bun' ? s.unLock : ""}`}>
                {card.type !== 'bun' && (<DragIcon type="primary" />)}
                <ConstructorElement  
                type={undefined}
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
              text={data[data.length-1].name}
              price={data[data.length-1].price}
              thumbnail={data[data.length-1].image}
              key={data[data.length-1]._id}
              />
      </div>  
      <div className={`${s.totalPrice} mb-10`}>
        <span className={`${s.price}`}>600 <CurrencyIcon type="primary" /></span>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
      </>
    )
  };
  
  return (
    <section className={`${s.root} pt-25`}>
      {Elements()}
    </section>
  )
}
  
BurgerConstructor.propTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
}).isRequired;

export default BurgerConstructor; 