import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails } from "../../services/actions/order-details";
import {
  SUM_INGREDIENT,
  CLEAR_INGREDIENTS_CONSTRUCTOR,
  CLEAR_INGREDIENTS_COUNT,
} from "../../services/actions/drop-constructor.js";
import {
  SELECTED_ORDET_DETAILS,
  DELETE_ORDET_DETAILS,
} from "../../services/actions/order-details.js";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

import { useHistory } from "react-router-dom";

import { TBurgerConstructor, TOrderDetails } from "../../utils/types";

import styles from "./info-burger-constructor.module.css";

type TDropConstructorState = {
  ingredientsConstructor: TBurgerConstructor[],
  sumIngredients: number
}

type TOrderDetailsState = {
  orderDetails: TOrderDetails,
  orderDetailsFailed: boolean,
  isOpenModalOrder: boolean,
  isLoading: boolean,
}

type TAuthState = {
  authauthorized: boolean
}

const InfoBurgerConstructor = () => {
  const { ingredientsConstructor, sumIngredients }: TDropConstructorState = useSelector(
    (state: any) => state.dropConstructor
  );

  const {
    orderDetails,
    orderDetailsFailed,
    isOpenModalOrder,
    isLoading,
  }: TOrderDetailsState = useSelector((state: any) => state.orderDetails);

  const { authauthorized }: TAuthState = useSelector((state: any) => state.auth);

  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SUM_INGREDIENT,
    });
  }, [ingredientsConstructor]);

  const handleOrderDetails = () => {
    if (!authauthorized) {
      history.push("/login");
    } else {
      const ingredietntsID = ingredientsConstructor.map(
        (ingredient) => ingredient._id
      );
      dispatch(getOrderDetails({ ingredients: ingredietntsID }) as any);
      if (orderDetailsFailed) {
        return <p>Произошла ошибка при получении данных</p>;
      } else {
        return orderDetails;
      }
    }
  };

  const handleOpenModal = () => {
    handleOrderDetails();
  };

  useEffect(() => {
    if (orderDetails?.order) {
      dispatch({
        type: SELECTED_ORDET_DETAILS,
      });
      dispatch({
        type: CLEAR_INGREDIENTS_CONSTRUCTOR,
      });
      dispatch({
        type: CLEAR_INGREDIENTS_COUNT,
      });
    }
  }, [orderDetails]);

  const handleCloseModal = () => {
    dispatch({
      type: DELETE_ORDET_DETAILS,
    });
  };

  return (
    <div className={styles.info}>
      <div className={`${styles.price} mr-10`}>
        <p className="text text_type_digits-medium mr-2">{sumIngredients}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={handleOpenModal}
        disabled={ingredientsConstructor.length === 0 ? true : false}
      >
        Оформить заказ
      </Button>
      {isLoading ? (
        <Modal header="Загрузка данных..." onCloseModal={handleCloseModal}>
          <p></p>
        </Modal>
      ) : isOpenModalOrder ? (
        <Modal
          header=""
          onCloseModal={handleCloseModal}
          // isOpenModal={isOpenModalOrder}
        >
          <OrderDetails />
        </Modal>
      ) : null}
    </div>
  );
};

export default InfoBurgerConstructor;
