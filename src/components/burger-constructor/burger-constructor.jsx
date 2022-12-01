import PropTypes from "prop-types";

import TopBurgerConstructor from "../top-burger-constructor/top-burger-constructor";
import BottomGburgerConstructor from "../bottom-burger-constructor/bottom-burger-constructor";
import CenterBurgerConstructor from "../center-burger-constructor/center-burger-constructor";
import InfoBurgerConstructor from "../info-burger-constructor/info-burger-constructor";

import stylesConstructor from "./burger-constructor.module.css";

const BurgerConstructor = ({ ingredients }) => {
  return (
    <section className={`${stylesConstructor.main} mt-25`}>
      <div className={`${stylesConstructor.wrp} mb-10`}>
        <div className={stylesConstructor.top}>
          {ingredients.map((ingredient) => {
            const { __v, type, _id } = ingredient;
            if (__v && type === "bun") {
              return (
                <TopBurgerConstructor
                  ingredient={ingredient}
                  key={`${_id}-top`}
                />
              );
            }
          })}
        </div>

        <div className={stylesConstructor.center}>
          {ingredients.map((ingredient) => {
            const { __v, type, _id } = ingredient;
            if (__v && (type === "main" || type === "sauce")) {
              return (
                <CenterBurgerConstructor ingredient={ingredient} key={_id} />
              );
            }
          })}
        </div>
        <div className={stylesConstructor.bottom}>
          {ingredients.map((ingredient) => {
            const { __v, type, _id } = ingredient;
            if (__v && type === "bun") {
              return (
                <BottomGburgerConstructor
                  ingredient={ingredient}
                  key={`${_id}-bottom`}
                />
              );
            }
          })}
        </div>
      </div>
      <InfoBurgerConstructor ingredients={ingredients} />
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default BurgerConstructor;
