import s from './IngredientDetails.module.css';
import { IData } from '../../utils/types';

export interface IDataOfCard {
    cardData: IData[]
}

const IngredientDetails = (props: IDataOfCard) => {
    return (
        <section>
               <img className={`${s.imageCard} pr-5 pl-5`} src={props.cardData[0].image} alt={props.cardData[0].name}/>
               <p className='text text_type_main-medium mt-4 mt-8'>{props.cardData[0].name}</p>
               <div className={`${s.description} mt-8`}>
                    <div>
                        <span className='text text_type_main-default text_color_inactive pb-2'>Калории,ккал</span>
                        <span className='text text_type_digits-default text_color_inactive'>{props.cardData[0].calories}</span>
                    </div>
                    <div>
                        <span className='text text_type_main-default text_color_inactive pb-2'>Белки, г</span>
                        <span className='text text_type_digits-default text_color_inactive'>{props.cardData[0].proteins}</span>
                    </div>
                    <div>
                        <span className='text text_type_main-default text_color_inactive pb-2'>Жиры, г</span>
                        <span className='text text_type_digits-default text_color_inactive'>{props.cardData[0].fat}</span>
                    </div>
                    <div>
                        <span className='text text_type_main-default text_color_inactive pb-2'>Углеводы, г</span>
                        <span className='text text_type_digits-default text_color_inactive'>{props.cardData[0].carbohydrates}</span>
                    </div>
                </div>
           </section>
    )
}           
export default IngredientDetails;            