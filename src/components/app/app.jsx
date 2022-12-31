import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import stylesApp from "./app.module.css";

const App = () => {
  return (
    <>
      <AppHeader />
      <main className={stylesApp.main}>
        <section className={stylesApp.section}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </section>
      </main>
    </>
  );
};

export default App;
