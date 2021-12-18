import s from './OrderDetails.module.css';
import imageCheckPath from '../../images/check.svg';

interface IOrder {
    order: number
}

const OrderDetails = (numberOrder: IOrder) => {
    return (
        <section className={`mt-20 mb-20`}>
            <span className={`${s.orderNumber} text text_type_digits-large`}>{numberOrder && numberOrder.order}</span>
            <span className='mt-8 mb-15 text text_type_main-medium'>идентификатор заказа</span>
            <img src={imageCheckPath} alt="check"/>
            <span className='mt-15 mb-2 text text_type_main-default'>Ваш заказ начали готовить</span>
            <span className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</span>
        </section>
    )
}           
export default OrderDetails;