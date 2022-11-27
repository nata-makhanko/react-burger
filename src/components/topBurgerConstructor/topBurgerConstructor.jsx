import PropTypes from "prop-types";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

const TopBurgerConstructor = ({ ingredient }) => {
  const { name, price, image } = ingredient;
  return (
    <div className="pr-3">
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${name} (верх)`}
        price={price}
        thumbnail={image}
      />
    </div>
  );
};

TopBurgerConstructor.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default TopBurgerConstructor;
