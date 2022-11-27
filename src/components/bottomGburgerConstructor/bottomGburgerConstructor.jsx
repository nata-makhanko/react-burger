import PropTypes from "prop-types";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

const BottomGburgerConstructor = ({ ingredient }) => {
  const { name, price, image } = ingredient;
  return (
    <div className="pr-3">
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${name} (низ)`}
        price={price}
        thumbnail={image}
      />
    </div>
  );
};

BottomGburgerConstructor.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default BottomGburgerConstructor;
