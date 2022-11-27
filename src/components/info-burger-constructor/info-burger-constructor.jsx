import PropTypes from "prop-types";

import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import stylesInfo from "./info-burger-constructor.module.css";

const InfoBurgerConstructor = ({ ingredients }) => {
  let sum = ingredients.reduce((acc, { price, __v }) => {
    return acc + price * __v;
  }, 0);
  return (
    <div className={stylesInfo.info}>
      <div className={`${stylesInfo.price} mr-10`}>
        <p className="text text_type_digits-medium mr-2">{sum}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
  );
};

InfoBurgerConstructor.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default InfoBurgerConstructor;
