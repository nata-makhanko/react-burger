import TopBurgerConstructor from "../top-burger-constructor/top-burger-constructor";
import BottomGburgerConstructor from "../bottom-burger-constructor/bottom-burger-constructor";
import CenterBurgerConstructor from "../center-burger-constructor/center-burger-constructor";
import InfoBurgerConstructor from "../info-burger-constructor/info-burger-constructor";

import stylesConstructor from "./burger-constructor.module.css";

import { data } from "../../utils/data.js";

const BurgerConstructor = () => {
  return (
    <section className={`${stylesConstructor.main} mt-25`}>
      <div className={`${stylesConstructor.wrp} mb-10`}>
        <div className={stylesConstructor.top}>
          {data.map((ingredient) => {
            const { __v, type, _id } = ingredient;
            if (__v && type === "bun") {
              return (
                <TopBurgerConstructor
                  ingredient={ingredient}
                  key={`${_id}-top`}
                />
              );
            }
            return null;
          })}
        </div>

        <div className={stylesConstructor.center}>
          {data.map((ingredient) => {
            const { __v, type, _id } = ingredient;
            if (__v && (type === "main" || type === "sauce")) {
              return (
                <CenterBurgerConstructor ingredient={ingredient} key={_id} />
              );
            }
            return null;
          })}
        </div>
        <div className={stylesConstructor.bottom}>
          {data.map((ingredient) => {
            const { __v, type, _id } = ingredient;
            if (__v && type === "bun") {
              return (
                <BottomGburgerConstructor
                  ingredient={ingredient}
                  key={`${_id}-bottom`}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
      {data && <InfoBurgerConstructor ingredients={data} />}
    </section>
  );
};

export default BurgerConstructor;
