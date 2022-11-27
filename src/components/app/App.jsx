import { Component } from "react";

import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";

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
