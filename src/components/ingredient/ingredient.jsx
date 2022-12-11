import { useContext } from "react";
import { SelectIngredientsContext } from "../../services/select-ingredient-context.js";
import { ingredientType } from "../../utils/types";
import PropTypes from "prop-types";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styleIngredient from "./ingredient.module.css";

const Ingredient = ({ ingredient, allIngredients }) => {
  const { name, price, image, _id } = ingredient;
  const [selectedState, selectedDispatcher] = useContext(
    SelectIngredientsContext
  );

  const handleSelectIngredient = (id) => {
    const ingredient = allIngredients.find(({ _id }) => id === _id);
    selectedDispatcher({
      type: "set",
      payload: ingredient,
    });
  };
  const countIngredients = 0;
  return (
    <div
      className={styleIngredient.ingredient}
      onClick={() => handleSelectIngredient(_id)}
    >
      {countIngredients > 0 && (
        <Counter count={countIngredients} size="default" extraClass="m-1" />
      )}
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
  ingredient: ingredientType,
  allIngredients: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default Ingredient;
