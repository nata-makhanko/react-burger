import { ingredientType } from "../../utils/types";

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
  ingredient: ingredientType,
};

export default TopBurgerConstructor;
