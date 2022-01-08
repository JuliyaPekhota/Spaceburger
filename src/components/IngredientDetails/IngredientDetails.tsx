import { FC } from 'react';
import s from './IngredientDetails.module.css';
import { useSelector } from 'react-redux';
import { RootState, IDataOfIngredient } from '../../utils/types';

const IngredientDetails: FC<IDataOfIngredient> = ({ _id }) => {
    const { ingredients } = useSelector((store: RootState) => store.ingredient);
    const { image, name, calories, proteins, fat, carbohydrates } = ingredients.filter((card: any) => card._id === _id)[0];
    return (
        <section>
            <img className={`${s.imageCard} pr-5 pl-5`} src={image} alt={name}/>
            <p className='text text_type_main-medium mt-4 mt-8'>{name}</p>
               <div className={`${s.description} mt-8`}>
                    <div>
                        <span className='text text_type_main-default text_color_inactive pb-2'>Калории,ккал</span>
                        <span className='text text_type_digits-default text_color_inactive'>{calories}</span>
                    </div>
                    <div>
                        <span className='text text_type_main-default text_color_inactive pb-2'>Белки, г</span>
                        <span className='text text_type_digits-default text_color_inactive'>{proteins}</span>
                    </div>
                    <div>
                        <span className='text text_type_main-default text_color_inactive pb-2'>Жиры, г</span>
                        <span className='text text_type_digits-default text_color_inactive'>{fat}</span>
                    </div>
                    <div>
                        <span className='text text_type_main-default text_color_inactive pb-2'>Углеводы, г</span>
                        <span className='text text_type_digits-default text_color_inactive'>{carbohydrates}</span>
                    </div>
                </div>
           </section>
    )
}           
export default IngredientDetails;            