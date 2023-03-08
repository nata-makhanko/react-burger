import styles from "./order-details.module.css";
import { useEffect, useRef } from "react";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

import { TOrderDetails } from "../../utils/types";

type TOrderDetailsState = {
  orderDetails: TOrderDetails
}

const OrderDetails = () => {
  const { orderDetails }:TOrderDetailsState  = useSelector((state: any) => state.orderDetails);

  let orderNumber = useRef(0);

  useEffect(() => {
    if (orderDetails?.order) {
      orderNumber.current = orderDetails.order.number;
    }
  }, [orderDetails]);
  return (
    <div className="mt-10 mb-30">
      <p
        className={`${styles.number} ${styles.center} text text_type_digits-large mb-8`}
      >
        {orderNumber.current}
      </p>
      <p className={`${styles.center} text text_type_main-medium mb-15`}>
        идентификатор заказа
      </p>
      <div className={`${styles.icon} mb-15`}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className={`${styles.center} text text_type_main-default mb-2`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`${styles.center} text text_type_main-default text_color_inactive`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
