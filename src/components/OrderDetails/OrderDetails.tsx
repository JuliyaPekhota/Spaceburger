
import { FC } from 'react';
import { useAppSelector } from '../../utils/hooks';
import ImageCheckPath from '../../images/check.svg';

import s from './OrderDetails.module.css';

export const OrderDetails: FC = () => {
    const number = useAppSelector(store => store.order.number);
    return (
        <section className={`${s.content} mt-20 mb-20`}>
            <span className={`${s.orderNumber} text text_type_digits-large`}>{number}</span>
            <span className='mt-8 mb-15 text text_type_main-medium'>идентификатор заказа</span>
            <ImageCheckPath />
            <span className='mt-15 mb-2 text text_type_main-default'>Ваш заказ начали готовить</span>
            <span className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</span>
        </section>
    )
}