import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import PropTypes from "prop-types";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor-list-item.module.css";

const BurgerConstructorListItem = ({
  name,
  price,
  image_mobile,
  uuid,
  _id,
  index,
  onMoveIngredient,
  onDeleteIngredient,
}) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "moveIngredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
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

BurgerConstructorListItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image_mobile: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onMoveIngredient: PropTypes.func.isRequired,
  onDeleteIngredient: PropTypes.func.isRequired,
};

export default BurgerConstructorListItem;
