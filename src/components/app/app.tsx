import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import NotFound from "../../pages/not-found";
import ProtectedRoute from "../protected-route";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import styles from "./app.module.css";

import { useEffect } from "react";
import { getProfile } from "../../services/actions/auth";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { useDispatch, useSelector } from "react-redux";

import {Location} from 'history';

type TAuthState = {
  authauthorized: boolean, 
  isLoggedIn: boolean
}

type TBurgerIngredientsState ={ 
  isLoadedIngredients: boolean
}

const App = () => {
  const { authauthorized, isLoggedIn }: TAuthState = useSelector((state: any) => state.auth);
  const { isLoadedIngredients }:TBurgerIngredientsState  = useSelector(
    (state: any) => state.burgerIngredients
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<{background: Location}>();

  const background = location.state && location.state.background;

  const handleCloseModal = () => history.goBack();

  useEffect(() => {
    if (authauthorized) {
      dispatch(getProfile() as any);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoadedIngredients) {
      dispatch(getIngredients() as any);
    }
  }, [isLoadedIngredients]);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.section}>
          <Switch location={background || location}>
            <Route path="/" exact>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </Route>
            <ProtectedRoute
              children={<Login />}
              path="/login"
              onlyForAuth={false}
            />
            <ProtectedRoute
              children={<Register />}
              path="/register"
              onlyForAuth={false}
            />
            <ProtectedRoute
              children={<ForgotPassword />}
              path="/forgot-password"
              onlyForAuth={false}
            />
            <ProtectedRoute
              children={<ResetPassword />}
              path="/reset-password"
              onlyForAuth={false}
            />
            <ProtectedRoute
              children={<Profile />}
              path="/profile"
              onlyForAuth={true}
            />
            <Route path="/ingredients/:id">
              <div className={styles.ingredient__wrp}>
                <p
                  className={`${styles.ingredient__title} text text_type_main-large`}
                >
                  Детали ингредиента
                </p>
                <IngredientDetails />
              </div>
            </Route>
            <Route path="*" component={NotFound} />
          </Switch>
          {background && (
            <Route path="/ingredients/:id">
              <Modal
                header="Детали ингредиента"
                onCloseModal={handleCloseModal}
              >
                <IngredientDetails />
              </Modal>
            </Route>
          )}
        </section>
      </main>
    </>
  );
};

export default App;
