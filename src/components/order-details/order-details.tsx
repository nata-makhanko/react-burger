import styles from "./order-details.module.css";
import { useEffect, useRef } from "react";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../hooks/index";


const OrderDetails = () => {
  const { orderDetails } = useSelector((state) => state.orderDetails);

  let orderNumber = useRef<number|undefined>(0);

  useEffect(() => {
    if (orderDetails.order?.number) {
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
