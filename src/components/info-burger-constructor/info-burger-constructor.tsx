import { useEffect } from "react";
import { useSelector, useDispatch } from "../../hooks/index";
import { getOrderDetails } from "../../services/actions/order-details";
import {
  SUM_INGREDIENT,
  CLEAR_INGREDIENTS_CONSTRUCTOR,
  CLEAR_INGREDIENTS_COUNT,
} from "../../services/actions/drop-constructor";
import {
  SELECTED_ORDET_DETAILS,
  DELETE_ORDET_DETAILS,
} from "../../services/actions/order-details";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

import { useHistory } from "react-router-dom";


import styles from "./info-burger-constructor.module.css";

const InfoBurgerConstructor = () => {
  const { ingredientsConstructor, sumIngredients }= useSelector(
    (state) => state.dropConstructor
  );

  const {
    orderDetails,
    orderDetailsFailed,
    isOpenModalOrder,
    isLoading,
  } = useSelector((state) => state.orderDetails);

  const { authauthorized } = useSelector((state) => state.auth);

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
      const ingredientsIDs = ingredientsConstructor.filter(ingredient => ingredient.type !== 'bun').map(ingredient => ingredient._id);
      const bunsIDs = ingredientsConstructor.filter(ingredient => ingredient.type === 'bun').map(ingredient => [ingredient._id, ingredient._id]).flat();
      dispatch(getOrderDetails({ ingredients: [...bunsIDs, ...ingredientsIDs ] }));
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

  const isEmptyOrderDetails = !Object.keys(orderDetails).length;

  useEffect(() => {
    if (!isEmptyOrderDetails) {
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
        >
          <OrderDetails />
        </Modal>
      ) : null}
    </div>
  );
};

export default InfoBurgerConstructor;
