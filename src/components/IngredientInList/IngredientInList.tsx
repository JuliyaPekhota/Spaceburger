import { FC, useState } from 'react';
import s from './IngredientInList.module.css';
import { RootState, ItemTypes, IDataOfIngredient } from '../../utils/types';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { OPEN_MODAL_DETAILS, CLOSE_MODAL_DETAILS } from '../../services/actions/IngredientDetails';

import { useSelector, useDispatch } from 'react-redux';

const IngredientInList: FC<IDataOfIngredient> = ({ _id }) => {
    const [showModal, setshowModal] = useState(false);
    const { ingredients, ingredientsInOrder } = useSelector((store: RootState) => store.ingredient);
    const { name, image, price } = ingredients.filter((card: any) => card._id === _id)[0];
    const dispatch = useDispatch();
    const countIngredientInOrder = ingredientsInOrder.filter(item => item._id === _id).length;

    const handleOpenModal = () => { 
        setshowModal(true);
        dispatch({
            type: OPEN_MODAL_DETAILS,
            _id
        });
    };

    const handleCloseModal = () => {
        setshowModal(false);
        dispatch({
            type: CLOSE_MODAL_DETAILS
        });
    }    
    
    const [{ opacity }, drag] = useDrag({
        type: ItemTypes.Ingredient,
        item: { _id },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

      return (
        <>
            {showModal ? (
                    <Modal header="Детали ингредиента" onClose={handleCloseModal}>
                        <IngredientDetails _id={_id}/>
                    </Modal>
                ) : null
            }
            <div ref={drag} style={{ opacity }} onClick={handleOpenModal} className={`${s.card} pr-4 pl-4`}>
                {countIngredientInOrder > 0 && <Counter count={countIngredientInOrder} size='default' />}
                <img src={image} alt={name} />
                <span className={`${s.price} mt-1 mb-1 text text_type_digits-default`}>{price} <CurrencyIcon type="primary" /></span>
                <span className={`${s.name} text text_type_main-default`}>{name}</span>
            </div>
        </>
      )
}
          
export default IngredientInList;  