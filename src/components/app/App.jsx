import { Component } from "react";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import stylesApp from "./app.module.css";

import { data } from "../../utils/data.js";

class App extends Component {
  state = {
    ingredients: data,
  };

  render() {
    const { ingredients } = this.state;
    return (
      <>
        <AppHeader />
        <main className={stylesApp.main}>
          <section className={stylesApp.section}>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </section>
        </main>
      </>
    );
  }
}

export default App;
