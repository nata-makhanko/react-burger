import { useEffect, useReducer } from "react";

import { ApiContext } from "../../services/api-context.js";
import { initialStateApi, apiReducer } from "../../services/api-reducer.js";
import { SelectIngredientsContext } from "../../services/select-ingredient-context.js";
import {
  selectReducer,
  initialStateSelectIngredient,
} from "../../services/select-ingredient-reducer.js";
import { ConstructorContext } from "../../services/constructor-context.js";
import {
  constructorReducer,
  initialStateConstructor,
} from "../../services/constructor-reducer.js";
import { OrderContext } from "../../services/order-context.js";
import {
  initialStateOrder,
  orderReducer,
} from "../../services/order-reducer.js";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import stylesApp from "./app.module.css";

export const _apiBase = "https://norma.nomoreparties.space/api";

const App = () => {
  const [ingredientsState, ingredientsDispatcher] = useReducer(
    apiReducer,
    initialStateApi,
    undefined
  );

  const [selectedState, selectedDispatcher] = useReducer(
    selectReducer,
    initialStateSelectIngredient
  );

  const [constructorState, constructorDispatcher] = useReducer(
    constructorReducer,
    initialStateConstructor
  );

  const [orderState, orderDispatcher] = useReducer(
    orderReducer,
    initialStateOrder
  );

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const res = await fetch(`${_apiBase}/ingredients`);
        if (res.ok) {
          const data = await res.json();
          ingredientsDispatcher({ type: "fetched", payload: data });
        } else {
          throw new Error(`Ошибка ${res.status}`);
        }
      } catch (error) {
        console.log(error);
        ingredientsDispatcher({ type: "error", payload: error });
      }
    };

    getIngredients();
  }, []);

  useEffect(() => {
    if (selectedState.selectIngredient != null) {
      if (selectedState.selectIngredient.type === "bun") {
        constructorDispatcher({
          type: "refresh",
          payload: selectedState.selectIngredient,
        });
      } else {
        constructorDispatcher({
          type: "set",
          payload: selectedState.selectIngredient,
        });
      }
    }
  }, [selectedState.selectIngredient]);

  return (
    <>
      <AppHeader />
      <main className={stylesApp.main}>
        <section className={stylesApp.section}>
          <ApiContext.Provider
            value={[ingredientsState, ingredientsDispatcher]}
          >
            <SelectIngredientsContext.Provider
              value={[selectedState, selectedDispatcher]}
            >
              <ConstructorContext.Provider
                value={[constructorState, constructorDispatcher]}
              >
                {ingredientsState.responseData?.success && (
                  <BurgerIngredients />
                )}
                <OrderContext.Provider value={[orderState, orderDispatcher]}>
                  <BurgerConstructor />
                </OrderContext.Provider>
              </ConstructorContext.Provider>
            </SelectIngredientsContext.Provider>
          </ApiContext.Provider>
        </section>
      </main>
    </>
  );
};

export default App;
