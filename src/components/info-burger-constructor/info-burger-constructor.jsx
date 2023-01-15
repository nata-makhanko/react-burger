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
import styles from "./info-burger-constructor.module.css";

const InfoBurgerConstructor = () => {
  const { ingredientsConstructor, sumIngredients } = useSelector(
    (state) => state.dropConstructor
  );

  const {
    orderDetails,
    orderDetailsRequest,
    orderDetailsFailed,
    isOpenModalOrder,
  } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SUM_INGREDIENT,
    });
  }, [ingredientsConstructor]);

  const handleOrderDetails = () => {
    const ingredietntsID = ingredientsConstructor.map(
      (ingredient) => ingredient._id
    );
    dispatch(getOrderDetails({ ingredients: ingredietntsID }));
    if (orderDetailsFailed) {
      return <p>Произошла ошибка при получении данных</p>;
    } else if (orderDetailsRequest) {
      console.log("efefef");
    } else {
      return orderDetails;
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
      {isOpenModalOrder && (
        <Modal
          header=""
          onCloseModal={handleCloseModal}
          isOpenModal={isOpenModalOrder}
        >
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default InfoBurgerConstructor;
