import styles from "./forgot-password.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { forgotPassword } from "../services/actions/recovery-password";
import { RESET_ISFOUNDEMAIL } from "../services/actions/recovery-password";

type TRecoveryPasswordState = {
  isFoundEmail: boolean
}

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { isFoundEmail }: TRecoveryPasswordState = useSelector((state: any) => state.recoveryPassword);

  const dispatch = useDispatch();

  const history = useHistory();

  const restorePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }) as any);
  };
  useEffect(() => {
    if (isFoundEmail) {
      history.replace("/reset-password");
    }
  }, [isFoundEmail]);

  useEffect(() => {
    dispatch({
      type: RESET_ISFOUNDEMAIL,
    });
  }, []);

  return (
    <section className={`${styles.wrp} pt-20`}>
      <form onSubmit={(e) => restorePassword(e)}>
        <p className={`${styles.center} text text_type_main-medium mb-6`}>
          Восстановление пароля
        </p>
        <EmailInput
          name={"email"}
          isIcon={false}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          extraClass="mb-6"
          placeholder="Укажите email"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass={`${styles.btn} mb-20`}
        >
          Восстановить
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

export default ForgotPassword;
