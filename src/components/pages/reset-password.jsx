import styles from "./reset-password.module.css";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { resetPassword } from "../../services/actions/recovery-password";

const ResetPassword = () => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const { isResetPassword, isFoundEmail } = useSelector(
    (state) => state.recoveryPassword
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSavePassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ password, token: code }));
  };

  useEffect(() => {
    if (isResetPassword) {
      history.replace("/login");
    }
  }, [isResetPassword]);

  useEffect(() => {
    if (!isFoundEmail) {
      history.replace("/forgot-password");
    }
  }, []);

  return (
    <section className={`${styles.wrp} pt-20`}>
      <form onSubmit={(e) => handleSavePassword(e)}>
        <p className={`${styles.center} text text_type_main-medium mb-6`}>
          Восстановление пароля
        </p>
        <PasswordInput
          name={"password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          extraClass="mb-6"
          placeholder={"Введите новый пароль"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={(e) => setCode(e.target.value)}
          value={code}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass={`${styles.btn} mb-20`}
        >
          Сохранить
        </Button>
      </form>

      <p
        className={`${styles.center} mb-4 text text_type_main-default text_color_inactive`}
      >
        Вспомнили пароль?
        <Link to="/login">
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="pl-1 pr-1 pb-1 pt-1"
          >
            Войти
          </Button>
        </Link>
      </p>
    </section>
  );
};

export default ResetPassword;
