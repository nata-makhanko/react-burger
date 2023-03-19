import BurgerConstructorList from "../burger-constructor-list/burger-constructor-list";
import InfoBurgerConstructor from "../info-burger-constructor/info-burger-constructor";
import { useSelector } from "../../hooks/index";
import styles from "./burger-constructor.module.css";

import { TTypeIngredients } from "../../utils/types";

const BurgerConstructor = () => {
  const typeIngredients = useSelector(
    (state) => state.dropConstructor.typeIngredients
  );

  return (
    <section className={`${styles.main} mt-25`}>
      <div className={`${styles.wrp} mb-10`}>
        {typeIngredients.map((type: TTypeIngredients) => {
          return <BurgerConstructorList {...type} key={type.position}/>;
        })}
        <InfoBurgerConstructor />
      </div>
    </section>
  );
};

export default BurgerConstructor;

