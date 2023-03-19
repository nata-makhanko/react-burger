import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import FeedListItemDetails from "../feed-list-item-details/feed-list-item-details";
import OrderListItemDetailes from '../order-list-item-detailes/order-list-item-detailes';
import Orders from "../orders/orders";

import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import NotFound from "../../pages/not-found";
import Feed from "../../pages/feed";
import ProtectedRoute from "../protected-route";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import styles from "./app.module.css";

import { useEffect } from "react";
import { getProfile } from "../../services/actions/auth";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { useDispatch, useSelector } from "../../hooks/index";


import {Location} from 'history';


const App = () => {
  const { authauthorized, isLoggedIn }= useSelector((state) => state.auth);
  const { isLoadedIngredients } = useSelector(
    (state) => state.burgerIngredients
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<{background: Location}>();

  const background = location.state && location.state.background;

  const handleCloseModal = () => history.goBack();

  useEffect(() => {
    if (authauthorized) {
      dispatch(getProfile());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoadedIngredients) {
      dispatch(getIngredients());
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
            <Route path="/feed" exact>
              <Feed />
            </Route>
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
            <Route path="/feed/:orderNumber">
                <OrderListItemDetailes />
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
          {background && (
            <Route path="/feed/:orderNumber">
              <Modal
                onCloseModal={handleCloseModal}
              >
                <FeedListItemDetails />
              </Modal>
            </Route>
          )}
          {background && (
            <Route path="/profile/orders/:orderNumber">
              <Modal
                onCloseModal={handleCloseModal}
              >
                <FeedListItemDetails />
              </Modal>
            </Route>
          )}
        </section>
      </main>
    </>
  );
};

export default App;
