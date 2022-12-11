import { useState, useEffect, useContext } from "react";
import { ApiContext } from "../../services/api-context.js";
import { SelectIngredientsContext } from "../../services/select-ingredient-context.js";
import PropTypes from "prop-types";

import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Ingredient from "../ingredient/ingredient.jsx";

import styles from "./ingredients-list.module.css";

const IngredientList = ({ bunRef, sauceRef, mainRef }) => {
  const [ingredientsState] = useContext(ApiContext);
  const [selectedState, selectedDispatcher] = useContext(
    SelectIngredientsContext
  );

  const [allIngredients, setAllIngredients] = useState(ingredientsState);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (selectedState.selectIngredient != null) {
      setIsOpenModal(true);
    }
  }, [selectedState.selectIngredient]);
  useEffect(() => {
    setAllIngredients(ingredientsState);
  }, [ingredientsState.responseData.success]);

  const renderIngredients = (type) => {
    return ingredientsState.responseData.data.map((ingredient) => {
      const { _id } = ingredient;
      if (ingredient.type === type) {
        return (
          <Ingredient
            key={_id}
            ingredient={ingredient}
            allIngredients={allIngredients.responseData.data}
          />
        );
      } else {
        return null;
      }
    });
  };

  const handleCloseModal = () => {
    selectedDispatcher({
      type: "reset",
    });
    setIsOpenModal(false);
  };

  return (
    <div className={styles.wrp}>
      <p ref={bunRef} className="text text_type_main-medium mb-6" id="bun">
        Булки
      </p>
      <div className={`${styles.ingredients} mb-10 pl-4`}>
        {renderIngredients("bun")}
      </div>

      <p ref={sauceRef} className="text text_type_main-medium mb-6" id="sauce">
        Соусы
      </p>
      <div className={`${styles.ingredients} mb-10 pl-4`}>
        {renderIngredients("sauce")}
      </div>
      <p ref={mainRef} className="text text_type_main-medium mb-6" id="main">
        Начинка
      </p>
      <div className={`${styles.ingredients} mb-10 pl-4`}>
        {renderIngredients("main")}
      </div>
      {isOpenModal && (
        <Modal header="Детали ингредиента" onCloseModal={handleCloseModal}>
          <IngredientDetails ingredient={selectedState.selectIngredient} />
        </Modal>
      )}
    </div>
  );
};

IngredientList.propTypes = {
  bunRef: PropTypes.object.isRequired,
  sauceRef: PropTypes.object.isRequired,
  mainRef: PropTypes.object.isRequired,
};

export default IngredientList;
