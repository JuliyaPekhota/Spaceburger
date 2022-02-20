import { FC, useRef } from 'react';
import s from './IngredientInOrder.module.css';
import { ConstructorElement, DragIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
import { IDataOfIngredient, ItemTypes, TypeElement, IIngredient, IDropItem } from '../../utils/types';
import { actionDeleteIngredientInOrder } from '../../services/actions/actionsIngredient';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { TAppState } from '../../services/reducers';
import { XYCoord } from 'dnd-core';
import cn from "classnames";

export const IngredientInOrder: FC<IDataOfIngredient> = ({ index, moveInOrder, position, _id }) => {
  const { ingredientsInOrder } = useAppSelector((store: TAppState) => store.ingredient);
  const { type, name, price, image, id } = ingredientsInOrder.filter((card: IIngredient) => card._id === _id)[0];

    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);
    
    const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.IngredientInOrder,
    collect: monitor => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item: IDropItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index ?? 0;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveInOrder?.(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  });

    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.IngredientInOrder,
      item: () => {
        return { id, index }
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    });

    drag(drop(ref));
    
    const onDelete = () => dispatch(actionDeleteIngredientInOrder(_id));

    const opacity = isDragging ? 0 : 1;
    return type === 'bun' ? 
        (
          <div className={s.bunTopBottom}>
            <ConstructorElement
              type={position === 'top' ? TypeElement.Top : TypeElement.Bottom}
              isLocked
              text={`${name} (${position === 'top' ? 'верх' : 'низ'})`}
              price={price}
              thumbnail={image}
            />
          </div>
        )
        :
        (
          <div ref={ref} style={{ opacity }} className={cn(s.fillings, 'mb-4 mr-4 ml-4')} data-handler-id={handlerId}>
              <DragIcon type="primary" />
              <ConstructorElement
              isLocked={type === 'bun'}
              text={name}
              price={price}
              thumbnail={image}
              handleClose={onDelete}
              />
          </div>
        )
}