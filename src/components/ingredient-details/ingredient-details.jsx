import stylesIngredientDetails from "./ingredient-details.module.css";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const { selectedIngredient } = useSelector(
    (state) => state.burgerIngredients
  );
  const { name, image_large, calories, proteins, fat, carbohydrates } =
    selectedIngredient[0];
  return (
    <div className={`${stylesIngredientDetails.modal} mb-15`}>
      <img
        src={image_large}
        alt={name}
        className={`${stylesIngredientDetails.img} mb-4`}
      />
      <p
        className={`${stylesIngredientDetails.center} text text_type_main-medium mb-8`}
      >
        {name}
      </p>
      <div className={stylesIngredientDetails.wrp}>
        <div>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории, ккал
          </p>
          <p
            className={`${stylesIngredientDetails.center} text text_type_digits-default text_color_inactive`}
          >
            {calories}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p
            className={`${stylesIngredientDetails.center} text text_type_digits-default text_color_inactive`}
          >
            {proteins}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p
            className={`${stylesIngredientDetails.center} text text_type_digits-default text_color_inactive`}
          >
            {fat}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p
            className={`${stylesIngredientDetails.center} text text_type_digits-default text_color_inactive`}
          >
            {carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
