import { ingredientType } from "../../utils/types";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styleCenterBurger from "./center-burger-constructor.module.css";

const CenterBurgerConstructor = ({ ingredient }) => {
  const { name, price, image } = ingredient;
  return (
    <div className={`${styleCenterBurger.wrp} pl-8`}>
      <DragIcon type="primary" />
      <ConstructorElement text={name} price={price} thumbnail={image} />
    </div>
  );
};

CenterBurgerConstructor.propTypes = {
  ingredient: ingredientType,
};

export default CenterBurgerConstructor;
