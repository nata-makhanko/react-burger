import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { TBurgerConstructor } from "../../utils/types";
import type { Identifier, XYCoord } from 'dnd-core'
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor-list-item.module.css";

type TBurgerConstructorListItemProps = TBurgerConstructor & {
  index: number,
  onMoveIngredient: (dragIndex: number, hoverIndex: number) => void,
  onDeleteIngredient: (uuid: string, id: string) => void,
}

interface DragItem {
  index: number
  id: string
  type: string
}

const BurgerConstructorListItem = ({
  name,
  price,
  image_mobile,
  uuid,
  _id,
  index,
  onMoveIngredient,
  onDeleteIngredient,
}: TBurgerConstructorListItemProps) => {

  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
  DragItem,
  void,
  { handlerId: Identifier | null }
>({
    accept: "moveIngredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      onMoveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "moveIngredient",
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div
      className={styles.wrp}
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image_mobile}
        handleClose={() => onDeleteIngredient(uuid, _id)}
      />
    </div>
  );
};

export default BurgerConstructorListItem;
