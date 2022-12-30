import BurgerConstructorList from "../burger-constructor-list/burger-constructor-list";
import InfoBurgerConstructor from "../info-burger-constructor/info-burger-constructor";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  const typeIngredients = useSelector(
    (state) => state.dropConstructor.typeIngredients
  );

  return (
    <section className={`${styles.main} mt-25`}>
      <div className={`${styles.wrp} mb-10`}>
        {typeIngredients.map((type) => {
          return <BurgerConstructorList {...type} key={uuidv4()} />;
        })}
        <InfoBurgerConstructor />
      </div>
    </section>
  );
};

export default BurgerConstructor;
