import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/burger-ingredients";
import {
  SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
} from "../../services/actions/burger-ingredients";
import PropTypes from "prop-types";

import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Ingredient from "../ingredient/ingredient.jsx";

import styles from "./ingredients-list.module.css";

const IngredientList = ({ bunRef, sauceRef, mainRef }) => {
  const { countInggredients } = useSelector((state) => state.dropConstructor);

  const {
    ingredients,
    ingredientsRequest,
    ingredientsFailed,
    isOpenModalIngredient,
  } = useSelector((state) => state.burgerIngredients);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const handleSelectedIngredient = (id) => {
    dispatch({
      type: SELECTED_INGREDIENT,
      id: id,
    });
  };

  const handleCloseModal = () => {
    dispatch({
      type: DELETE_SELECTED_INGREDIENT,
    });
  };
  const renderCounIngredient = (id) => {
    const ingredientWithCount = countInggredients
      .map((ingredient) => {
        if (ingredient._id === id) {
          return ingredient;
        } else {
          return 0;
        }
      })
      .filter((ingredient) => ingredient !== 0);
    if (ingredientWithCount.length > 0) {
      return ingredientWithCount[0].count;
    } else {
      return 0;
    }
  };
  const renderIngredients = (type) => {
    if (ingredientsFailed) {
      return <p>Произошла ошибка при получении данных</p>;
    } else if (ingredientsRequest) {
      return <p>Загрузка...</p>;
    } else {
      return ingredients.map((ingredient) => {
        const { _id } = ingredient;
        if (ingredient.type === type) {
          const count = renderCounIngredient(_id);
          return (
            <Ingredient
              key={_id}
              ingredient={ingredient}
              onToggleModal={handleSelectedIngredient}
              count={count}
            />
          );
        } else {
          return null;
        }
      });
    }
  };

  return (
    <div className={styles.wrp}>
      <div ref={bunRef} id="bun">
        <p className="text text_type_main-medium mb-6">Булки</p>
        <div className={`${styles.ingredients} mb-10 pl-4`}>
          {renderIngredients("bun")}
        </div>
      </div>
      <div ref={sauceRef} id="sauce">
        <p className="text text_type_main-medium mb-6">Соусы</p>
        <div className={`${styles.ingredients} mb-10 pl-4`}>
          {renderIngredients("sauce")}
        </div>
      </div>
      <div ref={mainRef} id="main">
        <p className="text text_type_main-medium mb-6">Начинка</p>
        <div className={`${styles.ingredients} mb-10 pl-4`}>
          {renderIngredients("main")}
        </div>
      </div>

      {isOpenModalIngredient && (
        <Modal
          header="Детали ингредиента"
          onCloseModal={handleCloseModal}
          isOpenModal={isOpenModalIngredient}
        >
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
};

IngredientList.propTypes = {
  bunRef: PropTypes.func.isRequired,
  sauceRef: PropTypes.func.isRequired,
  mainRef: PropTypes.func.isRequired,
};

export default IngredientList;
