import { useEffect, useState } from "react";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import stylesApp from "./app.module.css";

const _apiBase = "https://norma.nomoreparties.space/api/ingredients";

const App = () => {
  const [ingredients, setIngredients] = useState({
    data: [],
    success: false,
  });

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const res = await fetch(_apiBase);
        if (res.ok) {
          const data = await res.json();
          setIngredients({ ...data });
        }
        throw new Error(`Ошибка ${res.status}`);
      } catch (e) {
        console.log(e);
      }
    };

    getIngredients();
  }, []);
  return (
    <>
      <AppHeader />
      <main className={stylesApp.main}>
        <section className={stylesApp.section}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor />
        </section>
      </main>
    </>
  );
};

export default App;
