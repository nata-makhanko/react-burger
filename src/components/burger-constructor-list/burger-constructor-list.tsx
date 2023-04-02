import { useSelector, useDispatch } from "../../hooks/index";
import { useDrop } from "react-dnd";

import { v4 as uuidv4 } from "uuid";

import {
  INCREASE_INGREDIENT,
  DECREASE_INGREDIENT,
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT
} from "../../services/actions/drop-constructor";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerConstructorListItem from "../burger-constructor-list-item/burger-constructor-list-item";
import styles from "./burger-constructor-list.module.css";

import { TTypeIngredients, TBurgerConstructor } from "../../utils/types";


const BurgerConstructorList = ({ types, title, position }: TTypeIngredients) => {
  const { ingredientsConstructor }  = useSelector(
    (state) => state.dropConstructor
  );

  const dispatch = useDispatch();

  const [{ isOver, canDrop }, defDrop]= useDrop({
    accept: types,
    drop(item: TBurgerConstructor) {
      item.type === "bun" ? addBun(item) : addIngredients(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const addBun = (item: TBurgerConstructor) => {
    dispatch({
      type: INCREASE_INGREDIENT,
      ingredient: { type: item.type, _id: item._id },
    });
    dispatch({
      type: ADD_BUN,
      ingredient: item,
    });
  };

  const addIngredients = (item: TBurgerConstructor) => {
    dispatch({
      type: INCREASE_INGREDIENT,
      ingredient: { type: item.type, _id: item._id },
    });
    dispatch({
      type: ADD_INGREDIENT,
      ingredient: item,
    });
  };

  const handleDeleteIngredient = (uuid: string, id: string) => {
    dispatch({
      type: DECREASE_INGREDIENT,
      _id: id,
    });
    dispatch({
      type: DELETE_INGREDIENT,
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

  const hasIngredient = (position: string) => {
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

  const renderEmptyBox = (position: string, title: string) => {
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

  const renderIngredient = (types: string[], position: string) => {
    if (types.includes("bun")) {
      return ingredientsConstructor.map((ingredient) => {
        const { type, name, price, image_mobile, uuid, _id } = ingredient;
        if (type === "bun") {
          return (
            <div key={_id}>
            {position === 'top' ?
            <ConstructorElement
              type='top'
              isLocked={true}
              text={`${name} (верх)`}
              price={price}
              thumbnail={image_mobile}
              key={uuid}
            /> 
            : <ConstructorElement
            type= 'bottom'
            isLocked={true}
            text={`${name} (низ)`}
            price={price}
            thumbnail={image_mobile}
            key={uuid}
          />}
            </div>

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

  const handleMoveIngredient = (dragIndex: number, hoverIndex: number) => {
    dispatch({
      type: MOVE_INGREDIENT,
      dragIndex,
      hoverIndex,
    });
  };
  return (
    <div
      className={position === "center" ? `${styles.center} pr-4` : "pr-6 burger_constructor_bun"}
      ref={defDrop}
    >
      {hasIngredient(position)
        ? renderIngredient(types, position)
        : renderEmptyBox(position, title)}
    </div>
  );
};

export default BurgerConstructorList;
