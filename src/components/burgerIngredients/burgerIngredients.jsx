import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";

import stylesIngredients from "./burgerIngredients.module.css";

const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState("bun");
  useEffect(() => {
    document.getElementById(current).scrollIntoView(true, {
      behavior: "smooth",
      inline: "start",
    });
  });
  const renderIngredients = (ingredients, type) => {
    return ingredients.map((ingredient, index) => {
      const { _id } = ingredient;
      if (ingredient.type === type) {
        return <Ingredient key={_id} ingredient={ingredient} />;
      } else {
        return null;
      }
    });
  };
  return (
    <section className={stylesIngredients.section}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
      <div style={{ display: "flex" }} className="mb-10">
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={stylesIngredients.wrp}>
        <p className="text text_type_main-medium mb-6" id="bun">
          Булки
        </p>
        <div className={`${stylesIngredients.ingredients} mb-10 pl-4`}>
          {renderIngredients(ingredients, "bun")}
        </div>

        <p className="text text_type_main-medium mb-6" id="sauce">
          Соусы
        </p>
        <div className={`${stylesIngredients.ingredients} mb-10 pl-4`}>
          {renderIngredients(ingredients, "sauce")}
        </div>
        <p className="text text_type_main-medium mb-6" id="main">
          Начинка
        </p>
        <div className={`${stylesIngredients.ingredients} mb-10 pl-4`}>
          {renderIngredients(ingredients, "main")}
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default BurgerIngredients;
