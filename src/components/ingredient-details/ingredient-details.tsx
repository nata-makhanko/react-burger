import stylesIngredientDetails from "./ingredient-details.module.css";
import { useSelector } from "../../hooks/index";
import { useParams } from "react-router-dom";

import { TBurgerIngredient } from "../../utils/types";

type TUseParams = {
  id: string
}

const IngredientDetails = () => {
  let { id } = useParams<TUseParams>();

  const { ingredients, isLoadedIngredients } = useSelector(
    (state) => state.burgerIngredients
  );

  const selectedIngredient = ingredients.find(
    (ingredient: TBurgerIngredient) => ingredient._id === id
  );

  return (
    <>
      {isLoadedIngredients ? (
        <div className={`${stylesIngredientDetails.modal} mb-15`}>
          <img
            src={selectedIngredient?.image_large}
            alt={selectedIngredient?.name}
            className={`${stylesIngredientDetails.img} mb-4`}
          />
          <p data-testid='name_ingredient'
            className={`${stylesIngredientDetails.center} text text_type_main-medium mb-8`}
          >
            {selectedIngredient?.name}
          </p>
          <div className={stylesIngredientDetails.wrp}>
            <div>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Калории, ккал
              </p>
              <p
                className={`${stylesIngredientDetails.center} text text_type_digits-default text_color_inactive`}
              >
                {selectedIngredient?.calories}
              </p>
            </div>
            <div>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Белки, г
              </p>
              <p
                className={`${stylesIngredientDetails.center} text text_type_digits-default text_color_inactive`}
              >
                {selectedIngredient?.proteins}
              </p>
            </div>
            <div>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Жиры, г
              </p>
              <p
                className={`${stylesIngredientDetails.center} text text_type_digits-default text_color_inactive`}
              >
                {selectedIngredient?.fat}
              </p>
            </div>
            <div>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Углеводы, г
              </p>
              <p
                className={`${stylesIngredientDetails.center} text text_type_digits-default text_color_inactive`}
              >
                {selectedIngredient?.carbohydrates}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Загрузка данных...</p>
      )}
    </>
  );
};

export default IngredientDetails;
