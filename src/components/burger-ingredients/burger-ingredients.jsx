import { useState, useEffect, useRef } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "../ingredients-list/ingredients-list";
import stylesIngredients from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState("bun");

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    getCurrentRef(currentTab).scrollIntoView(true, {
      behavior: "smooth",
    });
  }, [currentTab]);

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

  return (
    <section className={stylesIngredients.section}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
      <div className={`${stylesIngredients.tabs} mb-10`}>
        <Tab value="bun" active={currentTab === "bun"} onClick={setCurrentTab}>
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentTab === "sauce"}
          onClick={setCurrentTab}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentTab === "main"}
          onClick={setCurrentTab}
        >
          Начинки
        </Tab>
      </div>
      <IngredientList bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} />
    </section>
  );
};

export default BurgerIngredients;
