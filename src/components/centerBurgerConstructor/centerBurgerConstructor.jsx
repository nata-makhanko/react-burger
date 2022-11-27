import PropTypes from "prop-types";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const CenterBurgerConstructor = ({ ingredient }) => {
  const { name, price, image } = ingredient;
  return (
    <div className="pl-8" style={{ display: "flex", alignItems: "center" }}>
      <DragIcon type="primary" />
      <ConstructorElement text={name} price={price} thumbnail={image} />
    </div>
  );
};

CenterBurgerConstructor.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default CenterBurgerConstructor;
