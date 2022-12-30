import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerConstructorListItem from "../burger-constructor-list-item/burger-constructor-list-item";
import styles from "./burger-constructor-list.module.css";

const BurgerConstructorList = ({ types, title, refDrop, position }) => {
  const { ingredientsConstructor } = useSelector(
    (state) => state.dropConstructor
  );

  const dispatch = useDispatch();

  const [{ isOver, canDrop }, defDrop] = useDrop({
    accept: types,
    defDrop: refDrop,
    drop(item) {
      item.type === "bun" ? addBun(item) : addIngredients(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const addBun = (item) => {
    dispatch({
      type: "INCREASE_INGREDIENT",
      ingredient: { type: item.type, _id: item._id },
    });
    dispatch({
      type: "ADD_BUN",
      ingredient: item,
    });
  };

  const addIngredients = (item) => {
    dispatch({
      type: "INCREASE_INGREDIENT",
      ingredient: { type: item.type, _id: item._id },
    });
    dispatch({
      type: "ADD_INGREDIENT",
      ingredient: item,
    });
  };

  const handleDeleteIngredient = (uuid, id) => {
    dispatch({
      type: "DECREASE_INGREDIENT",
      _id: id,
    });
    dispatch({
      type: "DELETE_INGREDIENT",
      uuid: uuid,
    });
  };

  const isActive = isOver && canDrop;
  let border = "none";
  if (isActive) {
    border = "1px solid #4C4CFF";
  } else if (canDrop) {
    border = "1px dashed #4C4CFF";
  }

  const hasIngredient = (position) => {
    if (position !== "center") {
      return ingredientsConstructor.some(
        (ingredient) => ingredient.type === "bun"
      );
    } else {
      return ingredientsConstructor.some(
        (ingredient) =>
          ingredient.type === "main" || ingredient.type === "sauce"
      );
    }
  };

  const renderEmptyBox = (position, title) => {
    const extraClasses = " pt-4 pl-6 pb-4 pr-4";
    return (
      <div
        style={{ border }}
        className={
          position === "top"
            ? `${styles.empty_burger_element__top} ${extraClasses}`
            : position === "center"
            ? `${styles.empty_burger_element} ${extraClasses}`
            : `${styles.empty_burger_element__bottom} ${extraClasses}`
        }
      >
        <p className="text text_type_main-default">{title}</p>
      </div>
    );
  };

  const renderIngredient = (types, position) => {
    if (types.includes("bun")) {
      return ingredientsConstructor.map((ingredient) => {
        const { type, name, price, image_mobile, uuid } = ingredient;
        if (type === "bun") {
          return (
            <ConstructorElement
              type={position}
              isLocked={true}
              text={position === "top" ? `${name} (верх)` : `${name} (низ)`}
              price={price}
              thumbnail={image_mobile}
              key={uuid}
            />
          );
        }
      });
    } else {
      return ingredientsConstructor.map((ingredient, index) => {
        const { type, uuid } = ingredient;
        if (type === "main" || type === "sauce") {
          return (
            <BurgerConstructorListItem
              {...ingredient}
              onMoveIngredient={handleMoveIngredient}
              index={index}
              key={uuid}
              onDeleteIngredient={handleDeleteIngredient}
            />
          );
        }
      });
    }
  };

  const handleMoveIngredient = (dragIndex, hoverIndex) => {
    dispatch({
      type: "MOVE_INGREDIENT",
      dragIndex,
      hoverIndex,
    });
  };
  return (
    <div
      className={position === "center" ? `${styles.center} pr-4` : "pr-6"}
      ref={defDrop}
    >
      {hasIngredient(position)
        ? renderIngredient(types, position)
        : renderEmptyBox(position, title)}
    </div>
  );
};

BurgerConstructorList.propTypes = {
  types: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  title: PropTypes.string.isRequired,
  refDrop: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
};
export default BurgerConstructorList;
