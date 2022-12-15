import { v4 as uuidv4 } from "uuid";

import { useContext } from "react";
import { ConstructorContext } from "../../services/constructor-context.js";

import TopBurgerConstructor from "../top-burger-constructor/top-burger-constructor";
import BottomBurgerConstructor from "../bottom-burger-constructor/bottom-burger-constructor";
import CenterBurgerConstructor from "../center-burger-constructor/center-burger-constructor";
import InfoBurgerConstructor from "../info-burger-constructor/info-burger-constructor";

import stylesConstructor from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  const [constructorState] = useContext(ConstructorContext);
  return (
    <section className={`${stylesConstructor.main} mt-25`}>
      <div className={`${stylesConstructor.wrp} mb-10`}>
        <div className={stylesConstructor.top}>
          {constructorState.constructorBurger.length > 0 &&
            constructorState.constructorBurger.map((ingredient) => {
              if (ingredient.type === "bun") {
                return (
                  <TopBurgerConstructor
                    ingredient={ingredient}
                    key={uuidv4()}
                  />
                );
              }
              return null;
            })}
        </div>
        <div className={stylesConstructor.center}>
          {constructorState.constructorBurger.length > 0 &&
            constructorState.constructorBurger.map((ingredient) => {
              if (ingredient.type === "main" || ingredient.type === "sauce") {
                return (
                  <CenterBurgerConstructor
                    ingredient={ingredient}
                    key={uuidv4()}
                  />
                );
              }
              return null;
            })}
        </div>
        <div className={stylesConstructor.bottom}>
          {constructorState.constructorBurger.length > 0 &&
            constructorState.constructorBurger.map((ingredient) => {
              if (ingredient.type === "bun") {
                return (
                  <BottomBurgerConstructor
                    ingredient={ingredient}
                    key={uuidv4()}
                  />
                );
              }
              return null;
            })}
        </div>
      </div>
      {<InfoBurgerConstructor />}
    </section>
  );
};

export default BurgerConstructor;
