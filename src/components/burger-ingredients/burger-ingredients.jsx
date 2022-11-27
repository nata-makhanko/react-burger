import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";

import stylesIngredients from "./burger-ingredients.module.css";

const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState("bun");
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();
  useEffect(() => {
    getCurrentRef(current).scrollIntoView(true, {
      behavior: "smooth",
    });
  }, [current]);

  const getCurrentRef = (id) => {
    switch (id) {
      case "bun":
        return bunRef.current;
      case "sauce":
        return sauceRef.current;
      default:
        return mainRef.current;
    }
  };

  const renderIngredients = (ingredients, type) => {
    return ingredients.map((ingredient) => {
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
      <div className={`${stylesIngredients.tabs} mb-10`}>
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
        <p ref={bunRef} className="text text_type_main-medium mb-6" id="bun">
          Булки
        </p>
        <div className={`${stylesIngredients.ingredients} mb-10 pl-4`}>
          {renderIngredients(ingredients, "bun")}
        </div>

        <p
          ref={sauceRef}
          className="text text_type_main-medium mb-6"
          id="sauce"
        >
          Соусы
        </p>
        <div className={`${stylesIngredients.ingredients} mb-10 pl-4`}>
          {renderIngredients(ingredients, "sauce")}
        </div>
        <p ref={mainRef} className="text text_type_main-medium mb-6" id="main">
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
