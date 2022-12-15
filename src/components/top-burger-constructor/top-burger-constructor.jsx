import { ingredientType } from "../../utils/types";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

const TopBurgerConstructor = ({ ingredient }) => {
  if (ingredient) {
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
  } else {
    return null;
  }
};

TopBurgerConstructor.propTypes = {
  ingredient: ingredientType,
};

export default TopBurgerConstructor;
