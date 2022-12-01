import { ingredientType } from "../../utils/types";
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
  ingredient: ingredientType,
};

export default BottomGburgerConstructor;
