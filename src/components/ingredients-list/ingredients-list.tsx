import { useSelector } from "../../hooks/index";

import Ingredient from "../ingredient/ingredient";

import styles from "./ingredients-list.module.css";

import { TBurgerIngredient } from "../../utils/types";


type TIngredientListProps = {
  bunRef: (node: HTMLDivElement)=> void,
  sauceRef: (node: HTMLDivElement)=> void,
  mainRef: (node: HTMLDivElement)=> void,
}


const IngredientList = ({ bunRef, sauceRef, mainRef }: TIngredientListProps) => {
  const { countInggredients } = useSelector((state) => state.dropConstructor);

  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => state.burgerIngredients
  );

  const renderCounIngredient = (id: string) => {
    const ingredientWithCount = countInggredients
      .filter((ingredient) => {
        if (ingredient._id === id) {
          return ingredient;
        } 
      });
    if (ingredientWithCount.length > 0) {
      return ingredientWithCount[0].count;
    } else {
      return 0;
    }
  };
  const renderIngredients = (type: string) => {
    if (ingredientsFailed) {
      return <p>Произошла ошибка при получении данных</p>;
    } else if (ingredientsRequest) {
      return <p>Загрузка...</p>;
    } else {
      return ingredients.map((ingredient: TBurgerIngredient) => {
        const { _id } = ingredient;
        if (ingredient.type === type) {
          const count = renderCounIngredient(_id);
          return <Ingredient key={_id} ingredient={ingredient} count={count} />;
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
    </div>
  );
};

export default IngredientList;
