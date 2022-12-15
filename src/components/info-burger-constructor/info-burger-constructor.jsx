import { useState, useContext, useEffect, useRef } from "react";
import { ConstructorContext } from "../../services/constructor-context.js";
import { OrderContext } from "../../services/order-context.js";

import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import stylesInfo from "./info-burger-constructor.module.css";
import { _apiBase } from "../app/app.jsx";
import { request } from "../../utils/request.js";

const InfoBurgerConstructor = () => {
  const [constructorState, constructorDispatcher] =
    useContext(ConstructorContext);
  const [orderState, orderDispatcher] = useContext(OrderContext);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [ingredietntsID, setIngredientsID] = useState({
    ingredients: [],
  });

  let sum = useRef(0);
  useEffect(() => {
    if (constructorState.constructorBurger.length > 0) {
      sum.current = constructorState.constructorBurger.reduce(
        (acc, { price, type }) => {
          if (type === "bun") {
            return acc + price * 2;
          } else {
            return acc + price;
          }
        },
        0
      );
    }
    let ids = constructorState.constructorBurger.map(({ _id }) => _id);
    setIngredientsID({ ingredients: ids });
  }, [constructorState.constructorBurger]);

  useEffect(() => {
    const postOrder = async () => {
      try {
        const data = await request(`${_apiBase}/orders`, {
          method: "POST",
          body: JSON.stringify(ingredietntsID),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        orderDispatcher({
          type: "set",
          payload: data.order.number,
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (isOpenModal) {
      postOrder();
    }
    return () => {
      constructorDispatcher({
        type: "reset",
      });
      sum.current = 0;
      orderDispatcher({
        type: "reset",
      });
    };
  }, [isOpenModal]);
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={stylesInfo.info}>
      <div className={`${stylesInfo.price} mr-10`}>
        <p className="text text_type_digits-medium mr-2">{sum.current}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={handleOpenModal}
      >
        Оформить заказ
      </Button>
      {isOpenModal && (
        <Modal header="" onCloseModal={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default InfoBurgerConstructor;
