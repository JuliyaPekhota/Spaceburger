import { FC } from 'react';
import { ItemTypes, IIngredient } from '../../utils/types';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
import { openModalDetails } from '../../services/actions/actionsIngredient';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import cn from "classnames";
import s from './IngredientInList.module.css';

interface IIngredientInListProps {
    _id: string;
}

export const IngredientInList: FC<IIngredientInListProps> = ({ _id }) => {
    const { ingredients, ingredientsInOrder } = useAppSelector(store => store.ingredient);
    const { name, image, price } = ingredients.filter((card: IIngredient) => card._id === _id)[0];
    const dispatch = useAppDispatch();
    const countIngredientInOrder = ingredientsInOrder.filter(item => item._id === _id).length;
    const location = useLocation();

    const handleOpenModal = (id: string) => {
        dispatch(openModalDetails(id));
    };
 
    const [{ opacity }, drag] = useDrag({
        type: ItemTypes.Ingredient,
        item: { _id },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

      return (    
            <Link id={`link_${_id}`} onClick={() => handleOpenModal(_id)} key={_id}
                  to={{
                        pathname: `/ingredients/${_id}`,
                        state: { modal: location }
                  }}
            >
                <div ref={drag} style={{ opacity }} id={`card_${_id}`} className={cn(s.card, "pr-4 pl-4")}>
                    {countIngredientInOrder > 0 && <Counter count={countIngredientInOrder} size='default' />}
                    <img src={image} alt={name} />
                    <span className={`${s.price} mt-1 mb-1 text text_type_digits-default`}>{price} <CurrencyIcon type="primary" /></span>
                    <span className={`${s.name} text text_type_main-default`}>{name}</span>
                </div>
            </Link>    
      )
}