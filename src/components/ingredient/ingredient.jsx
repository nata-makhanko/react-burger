import PropTypes from "prop-types";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styleIngredient from "./ingredient.module.css";

const Ingredient = ({ ingredient }) => {
  const { name, price, image, __v } = ingredient;
  return (
    <div className={styleIngredient.ingredient}>
      {__v ? <Counter count={__v} size="default" extraClass="m-1" /> : null}
      <img
        src={image}
        alt={name}
        className={`${styleIngredient.image} pr-4 pb-1 pl-4`}
      />
      <div className={`${styleIngredient.price} mb-1`}>
        <p className="text text_type_digits-default mr-1">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styleIngredient.name} text text_type_main-default`}>
        {name}
      </p>
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  }),
};

export default Ingredient;
