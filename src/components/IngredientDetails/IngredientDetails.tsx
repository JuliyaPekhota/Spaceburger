import { FC, useEffect } from 'react';
import { useAppThunkDispatch, useAppSelector } from '../../utils/hooks';
import { IIngredient } from '../../utils/types';
import { TAppState } from '../../services/reducers';
import { useParams } from "react-router-dom";
import { getIngredients } from '../../services/actions';

import s from './IngredientDetails.module.css';

interface IIngredientDetailsProps {
    type?: string;
}

export const IngredientDetails: FC<IIngredientDetailsProps> = ({ type }) => {
    const { ingredients, ingredientsSuccess } = useAppSelector((store: TAppState) => store.ingredient);
    const typeIsPage = type === "page";
    const { id } = useParams<{ id?: string }>();
    const dispatch = useAppThunkDispatch();

    useEffect(() => {
        if (typeIsPage) {
           dispatch(getIngredients())
        }
      }, [typeIsPage, dispatch]);

    return (
        <>
            {ingredientsSuccess && ingredients.length > 0 &&
             ingredients
             .filter(({ _id }: IIngredient) => _id === id)
             .map(({ image, name, calories, proteins, fat, carbohydrates, _id }: IIngredient) =>
               <section key={_id} className={s.content}>
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
        </>
    )
}        