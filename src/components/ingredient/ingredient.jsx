import { ingredientType } from "../../utils/types";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link, useLocation } from "react-router-dom";

import styles from "./ingredient.module.css";

const Ingredient = ({ ingredient, count }) => {
  const location = useLocation();
  const { name, price, image, _id, type, image_mobile } = ingredient;
  const [{ isDragging }, dragRef] = useDrag({
    type: type,
    item: {
      _id,
      uuid: uuidv4(),
      name,
      price,
      image_mobile,
      type,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <Link
      to={{
        pathname: `/ingredients/${_id}`,
        state: { background: location },
      }}
      className={styles.ingredient}
      draggable
      ref={dragRef}
      style={{ opacity }}
    >
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <img
        src={image}
        alt={name}
        className={`${styles.image} pr-4 pb-1 pl-4`}
      />
      <div className={`${styles.price} mb-1`}>
        <p className="text text_type_digits-default mr-1">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
    </Link>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientType,
  count: PropTypes.number.isRequired,
};

export default Ingredient;
