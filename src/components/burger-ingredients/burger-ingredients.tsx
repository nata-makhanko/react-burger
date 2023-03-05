import { useState, useEffect, useRef, useCallback } from "react";

import { useInView } from "react-intersection-observer";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "../ingredients-list/ingredients-list";
import stylesIngredients from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState("bun");
  const bunRef = useRef<HTMLDivElement>();
  const sauceRef = useRef<HTMLDivElement>();
  const mainRef = useRef<HTMLDivElement>();

  const { ref: bunRefInView, inView: setTabBun } = useInView({
    threshold: 1,
  });

  const { ref: sauceRefInView, inView: setTabSauce } = useInView({
    threshold: 1,
  });

  const { ref: mainRefInView, inView: setTabMain } = useInView({
    threshold: 0.6,
  });

  const setBunRef = useCallback(
    (node: HTMLDivElement) => {
      bunRef.current = node;
      bunRefInView(node);
    },
    [bunRefInView]
  );

  const setSauseRef = useCallback(
    (node: HTMLDivElement) => {
      sauceRef.current = node;
      sauceRefInView(node);
    },
    [sauceRefInView]
  );

  const setMainRef = useCallback(
    (node: HTMLDivElement) => {
      mainRef.current = node;
      mainRefInView(node);
    },
    [mainRefInView]
  );

  useEffect(() => {
    if (setTabBun) {
      setCurrentTab("bun");
    } else if (setTabSauce) {
      setCurrentTab("sauce");
    } else if (setTabMain) {
      setCurrentTab("main");
    }
  }, [setTabBun, setTabSauce, setTabMain]);

  useEffect(() => {
    if (currentTab === bunRef.current?.id) {
      bunRef.current.scrollIntoView({
        behavior: "smooth",
      });
    } else if (currentTab === sauceRef.current?.id) {
      sauceRef.current.scrollIntoView({
        behavior: "smooth",
      });
    } else if (currentTab === mainRef.current?.id) {
      mainRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [currentTab]);

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
      <IngredientList
        bunRef={setBunRef}
        sauceRef={setSauseRef}
        mainRef={setMainRef}
      />
    </section>
  );
};

export default BurgerIngredients;
