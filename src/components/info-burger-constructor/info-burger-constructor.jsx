import PropTypes from "prop-types";
import { useState } from "react";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import stylesInfo from "./info-burger-constructor.module.css";

const InfoBurgerConstructor = ({ ingredients }) => {
  let sum = ingredients.reduce((acc, { price, __v }) => {
    return acc + price * __v;
  }, 0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={stylesInfo.info}>
      <div className={`${stylesInfo.price} mr-10`}>
        <p className="text text_type_digits-medium mr-2">{sum}</p>
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

InfoBurgerConstructor.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default InfoBurgerConstructor;
